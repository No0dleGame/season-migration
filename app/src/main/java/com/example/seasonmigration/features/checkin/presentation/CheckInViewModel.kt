package com.example.seasonmigration.features.checkin.presentation

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.seasonmigration.core.utils.LocalImageManager
import com.example.seasonmigration.features.checkin.data.local.entity.CheckInEntity
import com.example.seasonmigration.features.checkin.data.repository.CheckInRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class CheckInUiState(
    val title: String = "",
    val description: String = "",
    val type: String = "CITY", // "CITY", "CAMP", "GAME"
    val imageUri: Uri? = null,
    val durationHours: String = "",
    val latitude: String = "",
    val longitude: String = "",
    val isSaving: Boolean = false,
    val saveSuccess: Boolean = false,
    val errorMessage: String? = null
)

class CheckInViewModel(
    private val repository: CheckInRepository,
    private val localImageManager: LocalImageManager
) : ViewModel() {

    private val _uiState = MutableStateFlow(CheckInUiState())
    val uiState: StateFlow<CheckInUiState> = _uiState.asStateFlow()

    fun updateTitle(title: String) {
        _uiState.value = _uiState.value.copy(title = title)
    }

    fun updateDescription(description: String) {
        _uiState.value = _uiState.value.copy(description = description)
    }

    fun updateType(type: String) {
        _uiState.value = _uiState.value.copy(type = type)
    }

    fun updateImageUri(uri: Uri?) {
        _uiState.value = _uiState.value.copy(imageUri = uri)
    }

    fun updateDurationHours(duration: String) {
        _uiState.value = _uiState.value.copy(durationHours = duration)
    }

    fun updateLatitude(lat: String) {
        _uiState.value = _uiState.value.copy(latitude = lat)
    }

    fun updateLongitude(lng: String) {
        _uiState.value = _uiState.value.copy(longitude = lng)
    }

    fun resetState() {
        _uiState.value = CheckInUiState()
    }

    fun saveCheckIn() {
        val currentState = _uiState.value
        if (currentState.title.isBlank()) {
            _uiState.value = currentState.copy(errorMessage = "标题不能为空")
            return
        }

        _uiState.value = currentState.copy(isSaving = true, errorMessage = null)

        viewModelScope.launch {
            try {
                var imagePath: String? = null
                currentState.imageUri?.let { uri ->
                    imagePath = localImageManager.saveImageToInternalStorage(uri)
                }

                val entity = CheckInEntity(
                    title = currentState.title,
                    description = currentState.description,
                    type = currentState.type,
                    imagePath = imagePath,
                    timestamp = System.currentTimeMillis(),
                    durationHours = currentState.durationHours.toDoubleOrNull(),
                    latitude = currentState.latitude.toDoubleOrNull(),
                    longitude = currentState.longitude.toDoubleOrNull()
                )

                repository.insertCheckIn(entity)
                _uiState.value = _uiState.value.copy(isSaving = false, saveSuccess = true)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isSaving = false,
                    errorMessage = "保存失败: ${e.message}"
                )
            }
        }
    }
}

class CheckInViewModelFactory(
    private val repository: CheckInRepository,
    private val localImageManager: LocalImageManager
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CheckInViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return CheckInViewModel(repository, localImageManager) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
