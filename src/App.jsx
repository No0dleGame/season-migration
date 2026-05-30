import React, { useState, useEffect } from 'react'
import { Leaf, Sun, Wind, Compass } from 'lucide-react'
import Login from './components/Login'
import StatusBar from './components/StatusBar'
import GameCheckIn from './components/GameCheckIn'
import LocationCheckIn from './components/LocationCheckIn'
import Timeline from './components/Timeline'
import { storage } from './utils/storage'

function App() {
  // 定义登录状态，默认为 false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 打卡数据状态
  const [punchData, setPunchData] = useState([]);

  // 组件挂载时检查本地存储中的登录状态并加载打卡数据
  useEffect(() => {
    const status = storage.getLoginStatus();
    setIsLoggedIn(status);
    
    if (status) {
      loadPunchData();
    }
  }, []);

  // 加载打卡数据
  const loadPunchData = () => {
    const data = storage.getPunchData();
    setPunchData(data);
  };

  /**
   * 登录成功的回调处理函数
   */
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    loadPunchData();
  };

  /**
   * 退出登录的处理函数
   */
  const handleLogout = () => {
    storage.clearLoginStatus();
    setIsLoggedIn(false);
  };

  // 如果未登录，则渲染登录组件，并传入登录成功的回调
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // 已登录状态，渲染主界面
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 relative">
      <StatusBar location="云南·大理" season="春日季" showReminder={true} />
      
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="max-w-md w-full mx-auto px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-8 text-center relative mb-6">
            {/* 退出登录按钮 */}
            <button 
              onClick={handleLogout}
              className="absolute top-4 right-4 text-sm font-medium text-gray-400 hover:text-terracotta transition-colors"
              title="退出登录"
            >
              退出
            </button>

            <div className="flex justify-center space-x-4 mb-6 text-terracotta">
              <Leaf className="w-6 h-6" />
              <Sun className="w-6 h-6" />
              <Wind className="w-6 h-6" />
              <Compass className="w-6 h-6" />
            </div>
            
            <h1 className="text-2xl font-bold mb-3 text-earth-800 tracking-wider">
              Season Migration
            </h1>
            
            <p className="text-sm text-earth-600 leading-relaxed">
              大地色系自然人文风格模板已就绪。
            </p>
          </div>

          <div className="space-y-6">
            <GameCheckIn onCheckIn={loadPunchData} />
            <LocationCheckIn onCheckIn={loadPunchData} />
            <Timeline punchData={punchData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
