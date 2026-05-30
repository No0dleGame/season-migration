package com.example.seasonmigration.features.inspiration.presentation

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.seasonmigration.core.utils.LocalImageManager
import com.example.seasonmigration.features.inspiration.data.local.entity.InspirationEntity
import com.example.seasonmigration.features.inspiration.data.repository.InspirationRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * 灵感UI状态数据类
 */
data class InspirationUiState(
    val title: String = "",
    val content: String = "",
    val imageUri: Uri? = null,
    val isSaving: Boolean = false,
    val saveSuccess: Boolean = false,
    val errorMessage: String? = null
)

/**
 * 灵感界面的ViewModel，处理业务逻辑和状态管理
 */
class InspirationViewModel(
    private val repository: InspirationRepository,
    private val localImageManager: LocalImageManager
) : ViewModel() {

    private val _uiState = MutableStateFlow(InspirationUiState())
    val uiState: StateFlow<InspirationUiState> = _uiState.asStateFlow()

    fun updateTitle(title: String) {
        _uiState.value = _uiState.value.copy(title = title)
    }

    fun updateContent(content: String) {
        _uiState.value = _uiState.value.copy(content = content)
    }

    fun updateImageUri(uri: Uri?) {
        _uiState.value = _uiState.value.copy(imageUri = uri)
    }

    fun resetState() {
        _uiState.value = InspirationUiState()
    }

    fun saveInspiration() {
        val currentState = _uiState.value
        if (currentState.title.isBlank() || currentState.content.isBlank()) {
            _uiState.value = currentState.copy(errorMessage = "标题和内容不能为空")
            return
        }

        _uiState.value = currentState.copy(isSaving = true, errorMessage = null)

        viewModelScope.launch {
            try {
                var imagePath: String? = null
                currentState.imageUri?.let { uri ->
                    imagePath = localImageManager.saveImageToInternalStorage(uri)
                }

                val entity = InspirationEntity(
                    title = currentState.title,
                    content = currentState.content,
                    imagePath = imagePath,
                    timestamp = System.currentTimeMillis()
                )

                repository.insertInspiration(entity)
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

/**
 * InspirationViewModel的工厂类，用于依赖注入
 */
class InspirationViewModelFactory(
    private val repository: InspirationRepository,
    private val localImageManager: LocalImageManager
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(InspirationViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return InspirationViewModel(repository, localImageManager) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
