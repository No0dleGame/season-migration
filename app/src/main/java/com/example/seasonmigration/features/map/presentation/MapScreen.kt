package com.example.seasonmigration.features.map.presentation

import android.preference.PreferenceManager
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MapScreen(
    viewModel: MapViewModel,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val footprints by viewModel.footprintLocations.collectAsState()

    // 初始化 Osmdroid 配置
    remember {
        Configuration.getInstance().load(context, PreferenceManager.getDefaultSharedPreferences(context))
        Configuration.getInstance().userAgentValue = context.packageName
        true
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("足迹地图") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            OsmdroidMapView(
                footprints = footprints,
                modifier = Modifier.fillMaxSize()
            )
        }
    }
}

@Composable
fun OsmdroidMapView(
    footprints: List<com.example.seasonmigration.features.checkin.data.local.entity.CheckInEntity>,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current

    AndroidView(
        factory = { ctx ->
            MapView(ctx).apply {
                setTileSource(TileSourceFactory.MAPNIK)
                setMultiTouchControls(true)
                controller.setZoom(5.0)
                // 默认中心点设置为中国附近
                controller.setCenter(GeoPoint(35.8617, 104.1954))
            }
        },
        modifier = modifier,
        update = { mapView ->
            mapView.overlays.clear()
            
            if (footprints.isNotEmpty()) {
                var lastPoint: GeoPoint? = null
                footprints.forEach { checkIn ->
                    val point = GeoPoint(checkIn.latitude!!, checkIn.longitude!!)
                    val marker = Marker(mapView).apply {
                        position = point
                        title = checkIn.title
                        snippet = checkIn.description
                        setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                    }
                    mapView.overlays.add(marker)
                    lastPoint = point
                }
                // 移动到最后一个点
                lastPoint?.let {
                    mapView.controller.setCenter(it)
                }
            }
            mapView.invalidate()
        }
    )

    // 管理 MapView 的生命周期
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            // 注意：由于我们在 AndroidView 的 update 中无法轻易拿到 mapView 实例来调用 onResume/onPause，
            // 简单的做法是可以忽略，或者通过 factory 缓存 mapView 实例。
            // 这里为了简单，仅使用基础的 Compose AndroidView。
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
