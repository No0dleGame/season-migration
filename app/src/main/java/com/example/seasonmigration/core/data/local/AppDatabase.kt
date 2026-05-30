package com.example.seasonmigration.core.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.seasonmigration.features.checkin.data.local.dao.CheckInDao
import com.example.seasonmigration.features.checkin.data.local.entity.CheckInEntity
import com.example.seasonmigration.features.inspiration.data.local.dao.InspirationDao
import com.example.seasonmigration.features.inspiration.data.local.entity.InspirationEntity
import com.example.seasonmigration.features.migrationplan.data.local.dao.MigrationPlanDao
import com.example.seasonmigration.features.migrationplan.data.local.entity.MigrationPlanEntity

/**
 * 应用程序的全局 Room 数据库
 * 包含打卡(CheckIn)、灵感(Inspiration)、迁移计划(MigrationPlan)三个表
 */
@Database(
    entities = [
        CheckInEntity::class,
        InspirationEntity::class,
        MigrationPlanEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun checkInDao(): CheckInDao
    abstract fun inspirationDao(): InspirationDao
    abstract fun migrationPlanDao(): MigrationPlanDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "season_migration_database"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
