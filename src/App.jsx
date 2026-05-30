import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import StatusBar from './components/StatusBar'
import GameCheckIn from './components/GameCheckIn'
import LocationCheckIn from './components/LocationCheckIn'
import Timeline from './components/Timeline'
import TravelMap from './components/TravelMap'
import TargetPointsList from './components/TargetPointsList'
import { storage } from './utils/storage'
import { getCurrentPosition, getCityName, getWeather } from './utils/locationService'

function App() {
  // 定义登录状态，默认为 false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 定义角色状态
  const [role, setRole] = useState(null);
  // 打卡数据状态
  const [punchData, setPunchData] = useState([]);
  // 目标点数据状态
  const [targetPoints, setTargetPoints] = useState([]);
  
  // 定位与天气状态
  const [locationData, setLocationData] = useState({
    city: '',
    temp: '',
    weather: '',
    coords: null,
    loading: false,
    error: null
  });

  // 面板开关状态
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // 组件挂载时检查本地存储中的登录状态并加载打卡数据和目标点数据
  useEffect(() => {
    const status = storage.getLoginStatus();
    if (status) {
      setIsLoggedIn(true);
      setRole(status);
      loadPunchData();
      loadTargetPoints();
    }
  }, []);

  // 当登录状态变为 true 时，获取定位和天气
  useEffect(() => {
    if (isLoggedIn) {
      fetchLocationAndWeather();
    }
  }, [isLoggedIn]);

  // 获取定位和天气数据
  const fetchLocationAndWeather = async () => {
    setLocationData(prev => ({ ...prev, loading: true, error: null }));
    try {
      // 请求浏览器定位权限
      const { lat, lon } = await getCurrentPosition();
      // 并行请求城市名称和天气数据以提升速度
      const [city, weather] = await Promise.all([
        getCityName(lat, lon),
        getWeather(lat, lon)
      ]);
      
      setLocationData({
        city: city,
        temp: `${weather.temperature}°C`,
        weather: weather.description,
        coords: { lat, lon },
        loading: false,
        error: null
      });
    } catch (err) {
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: err.message || '获取定位失败'
      }));
    }
  };

  // 加载打卡数据
  const loadPunchData = () => {
    const data = storage.getPunchData();
    setPunchData(data);
  };

  // 加载目标点数据
  const loadTargetPoints = () => {
    const points = storage.getTargetPoints();
    setTargetPoints(points);
  };

  // 添加目标点
  const handleAddTargetPoint = (coords) => {
    const newPoints = [...targetPoints, coords];
    setTargetPoints(newPoints);
    storage.setTargetPoints(newPoints);
  };

  // 移除目标点
  const handleRemoveTargetPoint = (index) => {
    const newPoints = targetPoints.filter((_, i) => i !== index);
    setTargetPoints(newPoints);
    storage.setTargetPoints(newPoints);
  };

  /**
   * 登录成功的回调处理函数
   */
  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    loadPunchData();
    loadTargetPoints();
  };

  /**
   * 退出登录的处理函数
   */
  const handleLogout = () => {
    storage.clearLoginStatus();
    setIsLoggedIn(false);
    setRole(null);
  };

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
        <StatusBar locationData={locationData} season="春日季" showReminder={true} />
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
        <TargetPointsList 
          targetPoints={targetPoints}
          onRemove={handleRemoveTargetPoint}
        />
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
