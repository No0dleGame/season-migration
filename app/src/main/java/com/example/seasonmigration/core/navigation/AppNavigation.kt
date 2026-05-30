package com.example.seasonmigration.core.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.seasonmigration.core.data.local.AppDatabase
import com.example.seasonmigration.core.utils.LocalImageManager
import com.example.seasonmigration.features.checkin.data.repository.CheckInRepository
import com.example.seasonmigration.features.checkin.presentation.CheckInScreen
import com.example.seasonmigration.features.checkin.presentation.CheckInViewModel
import com.example.seasonmigration.features.checkin.presentation.CheckInViewModelFactory
import com.example.seasonmigration.features.home.HomeScreen
import com.example.seasonmigration.features.inspiration.data.repository.InspirationRepository
import com.example.seasonmigration.features.inspiration.presentation.InspirationScreen
import com.example.seasonmigration.features.inspiration.presentation.InspirationViewModel
import com.example.seasonmigration.features.inspiration.presentation.InspirationViewModelFactory
import com.example.seasonmigration.features.migrationplan.data.repository.MigrationPlanRepository
import com.example.seasonmigration.features.migrationplan.presentation.MigrationPlanScreen
import com.example.seasonmigration.features.migrationplan.presentation.MigrationPlanViewModel
import com.example.seasonmigration.features.migrationplan.presentation.MigrationPlanViewModelFactory
import com.example.seasonmigration.features.map.presentation.MapScreen
import com.example.seasonmigration.features.map.presentation.MapViewModel
import com.example.seasonmigration.features.map.presentation.MapViewModelFactory
import com.example.seasonmigration.features.stats.presentation.StatsScreen
import com.example.seasonmigration.features.stats.presentation.StatsViewModel
import com.example.seasonmigration.features.stats.presentation.StatsViewModelFactory
import com.example.seasonmigration.features.export.presentation.ExportScreen
import com.example.seasonmigration.features.export.presentation.ExportViewModel
import com.example.seasonmigration.features.export.presentation.ExportViewModelFactory

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    val context = LocalContext.current

    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onNavigateToCheckIn = {
                    navController.navigate("checkin")
                },
                onNavigateToInspiration = {
                    navController.navigate("inspiration")
                },
                onNavigateToMigrationPlan = {
                    navController.navigate("migration_plan")
                },
                onNavigateToMap = {
                    navController.navigate("map")
                },
                onNavigateToStats = {
                    navController.navigate("stats")
                },
                onNavigateToExport = {
                    navController.navigate("export")
                }
            )
        }
        composable("checkin") {
            val database = AppDatabase.getDatabase(context)
            val repository = CheckInRepository(database.checkInDao())
            val imageManager = LocalImageManager(context)
            val factory = CheckInViewModelFactory(repository, imageManager)
            val checkInViewModel: CheckInViewModel = viewModel(factory = factory)

            CheckInScreen(
                viewModel = checkInViewModel,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable("inspiration") {
            val database = AppDatabase.getDatabase(context)
            val repository = InspirationRepository(database.inspirationDao())
            val imageManager = LocalImageManager(context)
            val factory = InspirationViewModelFactory(repository, imageManager)
            val inspirationViewModel: InspirationViewModel = viewModel(factory = factory)

            InspirationScreen(
                viewModel = inspirationViewModel,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable("migration_plan") {
            val database = AppDatabase.getDatabase(context)
            val repository = MigrationPlanRepository(database.migrationPlanDao())
            val factory = MigrationPlanViewModelFactory(repository)
            val migrationPlanViewModel: MigrationPlanViewModel = viewModel(factory = factory)

            MigrationPlanScreen(
                viewModel = migrationPlanViewModel,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable("map") {
            val database = AppDatabase.getDatabase(context)
            val repository = CheckInRepository(database.checkInDao())
            val factory = MapViewModelFactory(repository)
            val mapViewModel: MapViewModel = viewModel(factory = factory)

            MapScreen(
                viewModel = mapViewModel,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable("stats") {
            val database = AppDatabase.getDatabase(context)
            val repository = CheckInRepository(database.checkInDao())
            val factory = StatsViewModelFactory(repository)
            val statsViewModel: StatsViewModel = viewModel(factory = factory)

            StatsScreen(
                viewModel = statsViewModel,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable("export") {
            val database = AppDatabase.getDatabase(context)
            val repository = CheckInRepository(database.checkInDao())
            val factory = ExportViewModelFactory(repository)
            val exportViewModel: ExportViewModel = viewModel(factory = factory)

            ExportScreen(
                viewModel = exportViewModel,
                onNavigateBack = { navController.popBackStack() }
            )
        }
    }
}
