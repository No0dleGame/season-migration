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
    <div className="min-h-screen bg-earth-50 relative overflow-y-auto pb-8">
      <div className="w-full mx-auto px-4 mt-6 md:max-w-5xl max-w-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左列：状态栏与打卡功能 */}
          <div className="space-y-6">
            <StatusBar location="云南·大理" season="春日季" showReminder={true} />
            
            <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-8 text-center relative">
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

            <GameCheckIn onCheckIn={loadPunchData} />
            <LocationCheckIn onCheckIn={loadPunchData} />
          </div>

          {/* 右列：时间轴 */}
          <div className="space-y-6">
            <Timeline punchData={punchData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
