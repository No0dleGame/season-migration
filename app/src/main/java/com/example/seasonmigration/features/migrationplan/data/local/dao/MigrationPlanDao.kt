package com.example.seasonmigration.features.migrationplan.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.seasonmigration.features.migrationplan.data.local.entity.MigrationPlanEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface MigrationPlanDao {
    @Query("SELECT * FROM migration_plans ORDER BY startDate ASC")
    fun getAllMigrationPlans(): Flow<List<MigrationPlanEntity>>

    @Query("SELECT * FROM migration_plans WHERE id = :id")
    suspend fun getMigrationPlanById(id: Long): MigrationPlanEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMigrationPlan(plan: MigrationPlanEntity): Long

    @Update
    suspend fun updateMigrationPlan(plan: MigrationPlanEntity)

    @Delete
    suspend fun deleteMigrationPlan(plan: MigrationPlanEntity)
}
