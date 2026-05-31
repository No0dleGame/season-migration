import React, { useState, useEffect, useCallback } from 'react'
import Login from './components/Login'
import StatusBar from './components/StatusBar'
import GameCheckIn from './components/GameCheckIn'
import LocationCheckIn from './components/LocationCheckIn'
import Timeline from './components/Timeline'
import TravelMap from './components/TravelMap'
import TargetPointsList from './components/TargetPointsList'
import { storage } from './utils/storage'
import { getAddressDetail } from './utils/locationService'
import { useLocationAndWeather } from './hooks/useLocationAndWeather'
import { getCurrentSeason } from './utils/dateService'

function App() {
  // 定义登录状态，默认为 false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 定义角色状态
  const [role, setRole] = useState(null);
  // 打卡数据状态
  const [punchData, setPunchData] = useState([]);
  // 目标点数据状态
  const [targetPoints, setTargetPoints] = useState([]);
  
  // 定位与天气状态从 hook 获取
  const { locationData, fetchLocationAndWeather } = useLocationAndWeather();

  // 动态季节
  const currentSeason = getCurrentSeason();

  // 面板开关状态
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // 加载打卡数据
  const loadPunchData = useCallback(() => {
    const data = storage.getPunchData();
    setPunchData(data);
  }, []);

  // 自动导入 Excel 计划逻辑
  const loadExcelPlanAutomatically = useCallback(async () => {
    // 简单轮询等待 XLSX 库加载完成
    let attempts = 0;
    while (!window.XLSX && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }
    
    if (!window.XLSX) {
      console.warn('XLSX library failed to load, skipping auto-import');
      return;
    }

    try {
      const response = await fetch('/床车一年全国迁徙计划.xlsx');
      if (!response.ok) throw new Error('网络请求失败');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = window.XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = window.XLSX.utils.sheet_to_json(worksheet);

      const importedPoints = data.map((row, index) => {
        const rowValues = Object.values(row);
        const planName = row['周计划'] || row['计划'] || row['任务'] || rowValues[0] || `计划 ${index + 1}`;
        const address = row['地点'] || row['位置'] || row['城市'] || rowValues[1] || rowValues[0] || '未知地点';
        const estimatedTime = row['预计时间'] || row['时间'] || row['日期'] || '';
        
        return {
          lat: 39.9042 + (Math.random() - 0.5) * 5, // 暂用随机坐标分布在周边
          lng: 116.4074 + (Math.random() - 0.5) * 5,
          address: `${planName} - ${address}`,
          estimatedTime: estimatedTime,
          checkedIn: false,
          fromExcel: true
        };
      });

      setTargetPoints(importedPoints);
      storage.setTargetPoints(importedPoints);
      console.log(`Auto-imported ${importedPoints.length} target points.`);
    } catch (error) {
      console.error('自动导入 Excel 失败:', error);
    }
  }, []);

  // 加载目标点数据
  const loadTargetPoints = useCallback(async () => {
    const points = storage.getTargetPoints();
    if (!points || points.length === 0) {
      // 本地没有数据时，自动从 Excel 导入
      await loadExcelPlanAutomatically();
    } else {
      setTargetPoints(points);
    }
  }, [loadExcelPlanAutomatically]);

  // 组件挂载时检查本地存储中的登录状态并加载打卡数据和目标点数据
  useEffect(() => {
    const status = storage.getLoginStatus();
    if (status) {
      setIsLoggedIn(true);
      setRole(status);
      loadPunchData();
      loadTargetPoints();
    }
  }, [loadPunchData, loadTargetPoints]);

  // 当登录状态变为 true 时，获取定位和天气
  useEffect(() => {
    if (isLoggedIn) {
      fetchLocationAndWeather();
    }
  }, [isLoggedIn, fetchLocationAndWeather]);

  // 添加目标点
  const handleAddTargetPoint = useCallback(async (coords) => {
    // 先添加一个带有“加载中...”状态的临时点，避免用户觉得没反应
    const tempPoint = { ...coords, address: '正在获取地址信息...' };
    setTargetPoints(prev => {
      const newPoints = [...prev, tempPoint];
      return newPoints;
    });
    
    try {
      const address = await getAddressDetail(coords.lat, coords.lng);
      setTargetPoints(prevPoints => {
        const updatedPoints = [...prevPoints];
        const index = updatedPoints.findIndex(p => p.lat === coords.lat && p.lng === coords.lng);
        if (index !== -1) {
          updatedPoints[index] = { ...coords, address };
        }
        storage.setTargetPoints(updatedPoints);
        return updatedPoints;
      });
    } catch (e) {
      console.error(e);
      setTargetPoints(prevPoints => {
        const updatedPoints = [...prevPoints];
        const index = updatedPoints.findIndex(p => p.lat === coords.lat && p.lng === coords.lng);
        if (index !== -1) {
          updatedPoints[index] = { ...coords, address: '未知地址' };
        }
        storage.setTargetPoints(updatedPoints);
        return updatedPoints;
      });
    }
  }, []);

  // 移除目标点
  const handleRemoveTargetPoint = useCallback((index) => {
    setTargetPoints(prev => {
      const newPoints = prev.filter((_, i) => i !== index);
      storage.setTargetPoints(newPoints);
      return newPoints;
    });
  }, []);

  // 切换目标点打卡状态
  const handleToggleTargetPoint = useCallback((index) => {
    setTargetPoints(prev => {
      const newPoints = [...prev];
      newPoints[index] = { ...newPoints[index], checkedIn: !newPoints[index].checkedIn };
      storage.setTargetPoints(newPoints);
      return newPoints;
    });
  }, []);

  // 更新目标点时间
  const handleUpdateTargetTime = useCallback((index, newTime) => {
    setTargetPoints(prev => {
      const newPoints = [...prev];
      newPoints[index] = { ...newPoints[index], estimatedTime: newTime };
      storage.setTargetPoints(newPoints);
      return newPoints;
    });
  }, []);

  /**
   * 登录成功的回调处理函数
   */
  const handleLoginSuccess = useCallback((userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    loadPunchData();
    loadTargetPoints();
  }, [loadPunchData, loadTargetPoints]);

  /**
   * 退出登录的处理函数
   */
  const handleLogout = useCallback(() => {
    storage.clearLoginStatus();
    setIsLoggedIn(false);
    setRole(null);
  }, []);

  // 如果未登录，则渲染登录组件，并传入登录成功的回调
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // 已登录状态，渲染主界面
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-sand-50">
      {/* 退出按钮 */}
      <button 
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 text-sm font-medium text-earth-600 hover:text-terracotta transition-colors bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-earth-100"
        title="退出登录"
      >
        退出
      </button>

      {/* StatusBar */}
      <div className="absolute top-4 left-4 z-40">
        <StatusBar locationData={locationData} season={currentSeason} showReminder={true} />
      </div>

      {/* 左侧可折叠面板 */}
      <div className={`absolute top-20 left-4 w-[calc(100vw-2rem)] md:w-96 max-h-[calc(100vh-6rem)] overflow-y-auto z-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-6 transition-transform duration-300 ${isPanelOpen ? 'translate-x-0' : '-translate-x-[120%]'}`}>
        {role === 'admin' && (
          <>
            <GameCheckIn onCheckIn={loadPunchData} />
            <LocationCheckIn 
              onCheckIn={loadPunchData} 
              defaultLocation={locationData.city}
              onRefresh={() => fetchLocationAndWeather()}
            />
          </>
        )}
        <Timeline punchData={punchData} />
      </div>

      {/* 右侧目标点列表 */}
      {role === 'admin' && (
        <div className={`absolute top-20 right-4 z-30 md:z-40 w-[calc(100vw-2rem)] md:w-80 transition-opacity duration-300 ${isPanelOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100 pointer-events-auto'}`}>
          <TargetPointsList 
            targetPoints={targetPoints}
            onRemove={handleRemoveTargetPoint}
            onToggle={handleToggleTargetPoint}
            onUpdateTime={handleUpdateTargetTime}
          />
        </div>
      )}

      {/* 移动端控制面板开关的 FAB 按钮 */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-emerald-600 transition-colors"
      >
        {isPanelOpen ? '✕' : '☰'}
      </button>

      {/* 地图底层 */}
      <TravelMap 
        currentLocation={locationData.coords} 
        role={role} 
        targetPoints={targetPoints}
        onAddTarget={handleAddTargetPoint}
      />
    </div>
  )
}

export default App
