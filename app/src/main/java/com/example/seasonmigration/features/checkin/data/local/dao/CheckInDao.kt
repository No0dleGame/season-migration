package com.example.seasonmigration.features.checkin.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.seasonmigration.features.checkin.data.local.entity.CheckInEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface CheckInDao {
    @Query("SELECT * FROM check_ins ORDER BY timestamp DESC")
    fun getAllCheckIns(): Flow<List<CheckInEntity>>

    @Query("SELECT * FROM check_ins WHERE type = :type ORDER BY timestamp DESC")
    fun getCheckInsByType(type: String): Flow<List<CheckInEntity>>

    @Query("SELECT * FROM check_ins WHERE id = :id")
    suspend fun getCheckInById(id: Long): CheckInEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCheckIn(checkIn: CheckInEntity): Long

    @Update
    suspend fun updateCheckIn(checkIn: CheckInEntity)

    @Delete
    suspend fun deleteCheckIn(checkIn: CheckInEntity)
}
