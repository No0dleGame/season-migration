package com.example.seasonmigration.features.stats.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.seasonmigration.features.checkin.data.repository.CheckInRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

data class StatsUiState(
    val totalCheckIns: Int = 0,
    val totalGameHours: Double = 0.0,
    val cityCheckIns: Int = 0,
    val campCheckIns: Int = 0,
    val gameCheckIns: Int = 0
)

class StatsViewModel(private val repository: CheckInRepository) : ViewModel() {

    val statsUiState: StateFlow<StatsUiState> = repository.getAllCheckIns()
        .map { checkIns ->
            var gameHours = 0.0
            var cityCount = 0
            var campCount = 0
            var gameCount = 0

            for (checkIn in checkIns) {
                when (checkIn.type) {
                    "CITY" -> cityCount++
                    "CAMP" -> campCount++
                    "GAME" -> {
                        gameCount++
                        gameHours += checkIn.durationHours ?: 0.0
                    }
                }
            }

            StatsUiState(
                totalCheckIns = checkIns.size,
                totalGameHours = gameHours,
                cityCheckIns = cityCount,
                campCheckIns = campCount,
                gameCheckIns = gameCount
            )
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = StatsUiState()
        )
}

class StatsViewModelFactory(
    private val repository: CheckInRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(StatsViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return StatsViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
