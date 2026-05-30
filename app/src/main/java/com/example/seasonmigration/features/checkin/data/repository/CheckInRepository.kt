package com.example.seasonmigration.features.checkin.data.repository

import com.example.seasonmigration.features.checkin.data.local.dao.CheckInDao
import com.example.seasonmigration.features.checkin.data.local.entity.CheckInEntity
import kotlinx.coroutines.flow.Flow

/**
 * CheckIn 数据仓库，负责向 ViewModel 提供数据
 */
class CheckInRepository(private val checkInDao: CheckInDao) {

    fun getAllCheckIns(): Flow<List<CheckInEntity>> {
        return checkInDao.getAllCheckIns()
    }

    fun getCheckInsByType(type: String): Flow<List<CheckInEntity>> {
        return checkInDao.getCheckInsByType(type)
    }

    suspend fun getCheckInById(id: Long): CheckInEntity? {
        return checkInDao.getCheckInById(id)
    }

    suspend fun insertCheckIn(checkIn: CheckInEntity): Long {
        return checkInDao.insertCheckIn(checkIn)
    }

    suspend fun updateCheckIn(checkIn: CheckInEntity) {
        checkInDao.updateCheckIn(checkIn)
    }

    suspend fun deleteCheckIn(checkIn: CheckInEntity) {
        checkInDao.deleteCheckIn(checkIn)
    }
}
