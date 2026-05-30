package com.example.seasonmigration.features.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

/**
 * 首页屏幕组合函数
 * 负责展示UI并与ViewModel交互
 */
@Composable
fun HomeScreen(
    modifier: Modifier = Modifier,
    viewModel: HomeViewModel = viewModel(),
    onNavigateToCheckIn: () -> Unit = {},
    onNavigateToInspiration: () -> Unit = {},
    onNavigateToMigrationPlan: () -> Unit = {},
    onNavigateToMap: () -> Unit = {},
    onNavigateToStats: () -> Unit = {},
    onNavigateToExport: () -> Unit = {}
) {
    // 观察ViewModel中的UI状态
    val uiState by viewModel.uiState.collectAsState()

    Surface(
        modifier = modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = uiState.greetingMessage,
                style = MaterialTheme.typography.headlineMedium
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Button(onClick = { viewModel.updateGreeting("Compose 开发者") }) {
                Text(text = "更新问候语")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = onNavigateToCheckIn) {
                Text(text = "新增打卡")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = onNavigateToInspiration) {
                Text(text = "新增灵感")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = onNavigateToMigrationPlan) {
                Text(text = "新增迁移计划")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = onNavigateToMap) {
                Text(text = "足迹地图")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = onNavigateToStats) {
                Text(text = "数据统计")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = onNavigateToExport) {
                Text(text = "数据导出")
            }
        }
    }
}