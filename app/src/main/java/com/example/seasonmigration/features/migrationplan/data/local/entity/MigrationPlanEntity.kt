package com.example.seasonmigration.features.migrationplan.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * 迁移计划实体类，记录用户的出行、迁移计划
 */
@Entity(tableName = "migration_plans")
data class MigrationPlanEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val destination: String, // 目的地
    val startDate: Long, // 计划开始时间戳
    val endDate: Long, // 计划结束时间戳
    val notes: String, // 备注说明
    val isCompleted: Boolean = false // 是否已完成
)
