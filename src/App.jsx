import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import StatusBar from './components/StatusBar'
import GameCheckIn from './components/GameCheckIn'
import LocationCheckIn from './components/LocationCheckIn'
import Timeline from './components/Timeline'
import TravelMap from './components/TravelMap'
import { storage } from './utils/storage'
import { getCurrentPosition, getCityName, getWeather } from './utils/locationService'

function App() {
  // 定义登录状态，默认为 false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 定义角色状态
  const [role, setRole] = useState(null);
  // 打卡数据状态
  const [punchData, setPunchData] = useState([]);
  
  // 定位与天气状态
  const [locationData, setLocationData] = useState({
    city: '',
    temp: '',
    weather: '',
    coords: null,
    loading: false,
    error: null
  });

  // 组件挂载时检查本地存储中的登录状态并加载打卡数据
  useEffect(() => {
    const status = storage.getLoginStatus();
    if (status) {
      setIsLoggedIn(true);
      setRole(status);
      loadPunchData();
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

  /**
   * 登录成功的回调处理函数
   */
  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    loadPunchData();
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
    <div className="min-h-screen bg-earth-50 relative overflow-y-auto pb-8">
      <div className="w-full mx-auto px-4 mt-6 md:max-w-5xl max-w-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左列：状态栏与打卡功能 */}
          <div className="space-y-6">
            <StatusBar locationData={locationData} season="春日季" showReminder={true} />
            
            <div className="flex justify-end mb-2">
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-earth-600 hover:text-terracotta transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-earth-100"
                title="退出登录"
              >
                退出登录
              </button>
            </div>

            {role === 'admin' && (
              <>
                <GameCheckIn onCheckIn={loadPunchData} />
                <LocationCheckIn onCheckIn={loadPunchData} defaultLocation={locationData.city} />
              </>
            )}
          </div>

          {/* 右列：时间轴与地图 */}
          <div className="flex flex-col gap-6">
            <div className="order-2 md:order-1">
              <TravelMap currentLocation={locationData.coords} role={role} />
            </div>
            <div className="order-1 md:order-2">
              <Timeline punchData={punchData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
