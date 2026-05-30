package com.example.seasonmigration.features.inspiration.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.seasonmigration.features.inspiration.data.local.entity.InspirationEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface InspirationDao {
    @Query("SELECT * FROM inspirations ORDER BY timestamp DESC")
    fun getAllInspirations(): Flow<List<InspirationEntity>>

    @Query("SELECT * FROM inspirations WHERE id = :id")
    suspend fun getInspirationById(id: Long): InspirationEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertInspiration(inspiration: InspirationEntity): Long

    @Update
    suspend fun updateInspiration(inspiration: InspirationEntity)

    @Delete
    suspend fun deleteInspiration(inspiration: InspirationEntity)
}
