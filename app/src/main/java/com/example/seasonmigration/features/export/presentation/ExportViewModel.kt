package com.example.seasonmigration.features.export.presentation

import android.content.Context
import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.seasonmigration.features.checkin.data.repository.CheckInRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class ExportViewModel(private val repository: CheckInRepository) : ViewModel() {

    private val _exportStatus = MutableStateFlow<String?>(null)
    val exportStatus: StateFlow<String?> = _exportStatus.asStateFlow()

    fun resetStatus() {
        _exportStatus.value = null
    }

    fun exportToCsv(context: Context, uri: Uri) {
        viewModelScope.launch {
            try {
                val checkIns = repository.getAllCheckIns().first()
                val content = buildString {
                    append("ID,Title,Description,Type,Timestamp,Latitude,Longitude,DurationHours\n")
                    checkIns.forEach {
                        append("${it.id},\"${it.title}\",\"${it.description.replace("\n", " ")}\",${it.type},${it.timestamp},${it.latitude ?: ""},${it.longitude ?: ""},${it.durationHours ?: ""}\n")
                    }
                }

                context.contentResolver.openOutputStream(uri)?.use { outputStream ->
                    outputStream.write(content.toByteArray(Charsets.UTF_8))
                }
                _exportStatus.value = "CSV 导出成功！"
            } catch (e: Exception) {
                _exportStatus.value = "导出失败: ${e.message}"
            }
        }
    }

    fun exportToMarkdown(context: Context, uri: Uri) {
        viewModelScope.launch {
            try {
                val checkIns = repository.getAllCheckIns().first()
                val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
                val content = buildString {
                    append("# 打卡记录导出\n\n")
                    checkIns.forEach {
                        append("## ${it.title}\n")
                        append("- **类型**: ${it.type}\n")
                        append("- **时间**: ${dateFormat.format(Date(it.timestamp))}\n")
                        if (it.latitude != null && it.longitude != null) {
                            append("- **位置**: 纬度 ${it.latitude}, 经度 ${it.longitude}\n")
                        }
                        if (it.type == "GAME" && it.durationHours != null) {
                            append("- **开发时长**: ${it.durationHours} 小时\n")
                        }
                        append("\n**描述**:\n${it.description}\n\n")
                        append("---\n\n")
                    }
                }

                context.contentResolver.openOutputStream(uri)?.use { outputStream ->
                    outputStream.write(content.toByteArray(Charsets.UTF_8))
                }
                _exportStatus.value = "Markdown 导出成功！"
            } catch (e: Exception) {
                _exportStatus.value = "导出失败: ${e.message}"
            }
        }
    }
}

class ExportViewModelFactory(
    private val repository: CheckInRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ExportViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return ExportViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
