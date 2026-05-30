package com.example.seasonmigration.features.home

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * 首页视图模型
 * 遵循MVVM架构，负责管理UI状态和业务逻辑
 */
class HomeViewModel : ViewModel() {

    // 内部可变的状态流
    private val _uiState = MutableStateFlow(HomeUiState())
    // 暴露给UI的只读状态流
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    /**
     * 更新问候语
     */
    fun updateGreeting(name: String) {
        _uiState.value = _uiState.value.copy(
            greetingMessage = "你好, $name！欢迎来到季节迁徙应用。"
        )
    }
}

/**
 * 首页UI状态数据类
 */
data class HomeUiState(
    val greetingMessage: String = "你好，世界！"
)