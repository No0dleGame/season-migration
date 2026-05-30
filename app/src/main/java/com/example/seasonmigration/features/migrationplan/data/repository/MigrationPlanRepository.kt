package com.example.seasonmigration.features.migrationplan.data.repository

import com.example.seasonmigration.features.migrationplan.data.local.dao.MigrationPlanDao
import com.example.seasonmigration.features.migrationplan.data.local.entity.MigrationPlanEntity
import kotlinx.coroutines.flow.Flow

/**
 * MigrationPlan 数据仓库
 */
class MigrationPlanRepository(private val migrationPlanDao: MigrationPlanDao) {

    fun getAllMigrationPlans(): Flow<List<MigrationPlanEntity>> {
        return migrationPlanDao.getAllMigrationPlans()
    }

    suspend fun getMigrationPlanById(id: Long): MigrationPlanEntity? {
        return migrationPlanDao.getMigrationPlanById(id)
    }

    suspend fun insertMigrationPlan(plan: MigrationPlanEntity): Long {
        return migrationPlanDao.insertMigrationPlan(plan)
    }

    suspend fun updateMigrationPlan(plan: MigrationPlanEntity) {
        migrationPlanDao.updateMigrationPlan(plan)
    }

    suspend fun deleteMigrationPlan(plan: MigrationPlanEntity) {
        migrationPlanDao.deleteMigrationPlan(plan)
    }
}
