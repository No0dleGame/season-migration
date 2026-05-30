package com.example.seasonmigration.features.checkin.presentation

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CheckInScreen(
    viewModel: CheckInViewModel,
    onNavigateBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    // 当保存成功时触发返回或提示
    LaunchedEffect(uiState.saveSuccess) {
        if (uiState.saveSuccess) {
            snackbarHostState.showSnackbar("打卡成功！")
            viewModel.resetState()
            onNavigateBack()
        }
    }

    LaunchedEffect(uiState.errorMessage) {
        uiState.errorMessage?.let { msg ->
            snackbarHostState.showSnackbar(msg)
        }
    }

    // 图片选择器
    val pickMedia = rememberLauncherForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri ->
        if (uri != null) {
            viewModel.updateImageUri(uri)
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("新增打卡") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // 类型选择
            Text(text = "打卡类型", style = MaterialTheme.typography.titleMedium)
            val types = listOf("CITY" to "城市", "CAMP" to "营地", "GAME" to "游戏")
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
                types.forEach { (type, label) ->
                    Row(
                        Modifier
                            .selectable(
                                selected = (uiState.type == type),
                                onClick = { viewModel.updateType(type) },
                                role = Role.RadioButton
                            )
                            .padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = (uiState.type == type),
                            onClick = null // null 推荐做法，事件由 Row 的 selectable 处理
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = label)
                    }
                }
            }

            // 标题输入
            OutlinedTextField(
                value = uiState.title,
                onValueChange = { viewModel.updateTitle(it) },
                label = { Text("标题") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            // 描述输入
            OutlinedTextField(
                value = uiState.description,
                onValueChange = { viewModel.updateDescription(it) },
                label = { Text("描述 (可选)") },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp),
                maxLines = 5
            )

            // 图片选择与展示
            Button(
                onClick = {
                    pickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (uiState.imageUri == null) "添加图片" else "更换图片")
            }

            if (uiState.type == "GAME") {
                OutlinedTextField(
                    value = uiState.durationHours,
                    onValueChange = { viewModel.updateDurationHours(it) },
                    label = { Text("开发时长 (小时)") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )
            }

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = uiState.latitude,
                    onValueChange = { viewModel.updateLatitude(it) },
                    label = { Text("纬度 (可选)") },
                    modifier = Modifier.weight(1f),
                    singleLine = true
                )
                OutlinedTextField(
                    value = uiState.longitude,
                    onValueChange = { viewModel.updateLongitude(it) },
                    label = { Text("经度 (可选)") },
                    modifier = Modifier.weight(1f),
                    singleLine = true
                )
            }

            if (uiState.imageUri != null) {
                AsyncImage(
                    model = ImageRequest.Builder(LocalContext.current)
                        .data(uiState.imageUri)
                        .crossfade(true)
                        .build(),
                    contentDescription = "选择的图片",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                )
            }

            Spacer(modifier = Modifier.weight(1f, fill = false))

            // 保存按钮
            Button(
                onClick = { viewModel.saveCheckIn() },
                modifier = Modifier.fillMaxWidth(),
                enabled = !uiState.isSaving
            ) {
                if (uiState.isSaving) {
                    CircularProgressIndicator(modifier = Modifier.size(24.dp))
                } else {
                    Text("保存打卡")
                }
            }
        }
    }
}
