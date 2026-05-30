package com.example.seasonmigration.features.checkin.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * 打卡实体类，表示用户的一次打卡记录
 * 包含城市(City)、营地(Camp)和游戏(Game)三种类型
 */
@Entity(tableName = "check_ins")
data class CheckInEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val description: String,
    val imagePath: String?, // 存储通过 LocalImageManager 拷贝到内部的图片路径
    val type: String, // 区分 "CITY", "CAMP", "GAME"
    val timestamp: Long, // 打卡时间戳
    val latitude: Double? = null,
    val longitude: Double? = null,
    val durationHours: Double? = null // 游戏开发时长（小时）
)
