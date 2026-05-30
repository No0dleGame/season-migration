package com.example.seasonmigration.features.map.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.seasonmigration.features.checkin.data.local.entity.CheckInEntity
import com.example.seasonmigration.features.checkin.data.repository.CheckInRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

class MapViewModel(private val repository: CheckInRepository) : ViewModel() {

    // 只获取包含经纬度的打卡记录
    val footprintLocations: StateFlow<List<CheckInEntity>> = repository.getAllCheckIns()
        .map { checkIns ->
            checkIns.filter { it.latitude != null && it.longitude != null }
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
}

class MapViewModelFactory(
    private val repository: CheckInRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MapViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return MapViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
