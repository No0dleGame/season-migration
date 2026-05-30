package com.example.seasonmigration.features.migrationplan.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.seasonmigration.features.migrationplan.data.local.entity.MigrationPlanEntity
import com.example.seasonmigration.features.migrationplan.data.repository.MigrationPlanRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * 迁移计划 UI 状态数据类
 */
data class MigrationPlanUiState(
    val destination: String = "",
    val startDate: Long = System.currentTimeMillis(),
    val endDate: Long = System.currentTimeMillis() + 86400000L, // 默认多一天
    val notes: String = "",
    val isSaving: Boolean = false,
    val saveSuccess: Boolean = false,
    val errorMessage: String? = null
)

/**
 * 迁移计划界面的ViewModel，处理业务逻辑和状态管理
 */
class MigrationPlanViewModel(
    private val repository: MigrationPlanRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(MigrationPlanUiState())
    val uiState: StateFlow<MigrationPlanUiState> = _uiState.asStateFlow()

    fun updateDestination(destination: String) {
        _uiState.value = _uiState.value.copy(destination = destination)
    }

    fun updateStartDate(startDate: Long) {
        _uiState.value = _uiState.value.copy(startDate = startDate)
    }

    fun updateEndDate(endDate: Long) {
        _uiState.value = _uiState.value.copy(endDate = endDate)
    }

    fun updateNotes(notes: String) {
        _uiState.value = _uiState.value.copy(notes = notes)
    }

    fun resetState() {
        _uiState.value = MigrationPlanUiState()
    }

    fun saveMigrationPlan() {
        val currentState = _uiState.value
        if (currentState.destination.isBlank()) {
            _uiState.value = currentState.copy(errorMessage = "目的地不能为空")
            return
        }
        if (currentState.startDate > currentState.endDate) {
            _uiState.value = currentState.copy(errorMessage = "开始时间不能晚于结束时间")
            return
        }

        _uiState.value = currentState.copy(isSaving = true, errorMessage = null)

        viewModelScope.launch {
            try {
                val entity = MigrationPlanEntity(
                    destination = currentState.destination,
                    startDate = currentState.startDate,
                    endDate = currentState.endDate,
                    notes = currentState.notes,
                    isCompleted = false
                )

                repository.insertMigrationPlan(entity)
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
 * MigrationPlanViewModel的工厂类，用于依赖注入
 */
class MigrationPlanViewModelFactory(
    private val repository: MigrationPlanRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MigrationPlanViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return MigrationPlanViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
