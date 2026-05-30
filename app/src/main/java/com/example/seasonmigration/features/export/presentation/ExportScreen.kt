package com.example.seasonmigration.features.export.presentation

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ExportScreen(
    viewModel: ExportViewModel,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val exportStatus by viewModel.exportStatus.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(exportStatus) {
        exportStatus?.let { msg ->
            snackbarHostState.showSnackbar(msg)
            viewModel.resetStatus()
        }
    }

    val createCsvLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.CreateDocument("text/csv")
    ) { uri ->
        uri?.let { viewModel.exportToCsv(context, it) }
    }

    val createMdLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.CreateDocument("text/markdown")
    ) { uri ->
        uri?.let { viewModel.exportToMarkdown(context, it) }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("数据导出") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
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
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Button(
                onClick = { createCsvLauncher.launch("checkins.csv") },
                modifier = Modifier.fillMaxWidth().height(56.dp)
            ) {
                Text("导出为 CSV")
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            Button(
                onClick = { createMdLauncher.launch("checkins.md") },
                modifier = Modifier.fillMaxWidth().height(56.dp)
            ) {
                Text("导出为 Markdown")
            }
        }
    }
}
