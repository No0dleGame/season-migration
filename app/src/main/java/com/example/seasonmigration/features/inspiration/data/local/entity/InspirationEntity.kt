package com.example.seasonmigration.features.inspiration.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * 灵感实体类，记录用户的各种灵感
 */
@Entity(tableName = "inspirations")
data class InspirationEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val content: String,
    val imagePath: String?, // 可能附带图片
    val timestamp: Long // 记录时间戳
)
