package com.example.seasonmigration.features.inspiration.data.repository

import com.example.seasonmigration.features.inspiration.data.local.dao.InspirationDao
import com.example.seasonmigration.features.inspiration.data.local.entity.InspirationEntity
import kotlinx.coroutines.flow.Flow

/**
 * Inspiration 数据仓库
 */
class InspirationRepository(private val inspirationDao: InspirationDao) {

    fun getAllInspirations(): Flow<List<InspirationEntity>> {
        return inspirationDao.getAllInspirations()
    }

    suspend fun getInspirationById(id: Long): InspirationEntity? {
        return inspirationDao.getInspirationById(id)
    }

    suspend fun insertInspiration(inspiration: InspirationEntity): Long {
        return inspirationDao.insertInspiration(inspiration)
    }

    suspend fun updateInspiration(inspiration: InspirationEntity) {
        inspirationDao.updateInspiration(inspiration)
    }

    suspend fun deleteInspiration(inspiration: InspirationEntity) {
        inspirationDao.deleteInspiration(inspiration)
    }
}
