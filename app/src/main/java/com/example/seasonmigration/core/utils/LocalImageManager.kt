package com.example.seasonmigration.core.utils

import android.content.Context
import android.net.Uri
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream
import java.util.UUID

/**
 * 本地图片管理器，负责将用户选择的图片拷贝到内部存储中，并返回保存的相对路径或绝对路径
 */
class LocalImageManager(private val context: Context) {

    /**
     * 将给定的 Uri 对应的图片拷贝到应用的内部存储区 (filesDir/images) 中，并返回文件路径
     * @param uri 图片的 Uri
     * @return 成功则返回保存后的文件绝对路径，失败则返回 null
     */
    suspend fun saveImageToInternalStorage(uri: Uri): String? {
        return withContext(Dispatchers.IO) {
            try {
                // 创建 images 文件夹
                val imagesDir = File(context.filesDir, "images")
                if (!imagesDir.exists()) {
                    imagesDir.mkdirs()
                }

                // 生成唯一的文件名
                val fileName = "img_${UUID.randomUUID()}.jpg"
                val destinationFile = File(imagesDir, fileName)

                // 从 Uri 读取数据并写入到目标文件中
                context.contentResolver.openInputStream(uri)?.use { inputStream ->
                    FileOutputStream(destinationFile).use { outputStream ->
                        copyStream(inputStream, outputStream)
                    }
                }
                destinationFile.absolutePath
            } catch (e: Exception) {
                e.printStackTrace()
                null
            }
        }
    }

    /**
     * 删除指定的本地图片
     */
    suspend fun deleteImage(imagePath: String): Boolean {
        return withContext(Dispatchers.IO) {
            try {
                val file = File(imagePath)
                if (file.exists()) {
                    file.delete()
                } else {
                    false
                }
            } catch (e: Exception) {
                e.printStackTrace()
                false
            }
        }
    }

    private fun copyStream(input: InputStream, output: FileOutputStream) {
        val buffer = ByteArray(1024 * 4) // 4KB buffer
        var bytesRead: Int
        while (input.read(buffer).also { bytesRead = it } != -1) {
            output.write(buffer, 0, bytesRead)
        }
        output.flush()
    }
}
