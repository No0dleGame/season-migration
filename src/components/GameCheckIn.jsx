import React, { useState } from 'react';
import { storage } from '../utils/storage';

/**
 * 游戏开发打卡卡片组件
 * 记录每日4小时目标，提供直观的进度展示
 * 采用自然人文风格，适配移动端
 */
const GameCheckIn = ({ initialHours = 0, goalHours = 4, onCheckIn }) => {
  const [hours, setHours] = useState(initialHours);

  // 处理打卡逻辑
  const handleCheckIn = () => {
    const newHours = Math.min(hours + 1, goalHours);
    setHours(newHours);
    
    // 保存到 localStorage
    const currentData = storage.getPunchData();
    const newRecord = {
      id: Date.now().toString(),
      type: 'game',
      value: 1,
      totalHours: newHours,
      timestamp: Date.now()
    };
    storage.setPunchData([...currentData, newRecord]);
    
    // 触发父组件更新
    if (onCheckIn) {
      onCheckIn();
    }
  };

  // 计算进度百分比，最高100%
  const progress = Math.min((hours / goalHours) * 100, 100);

  return (
    <div className="bg-earth-50 rounded-2xl p-5 shadow-sm border border-earth-200 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-forest font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          游戏开发修行
        </h3>
        <span className="text-earth-600 text-sm font-medium">{hours} / {goalHours} 小时</span>
      </div>
      
      {/* 进度条 */}
      <div className="w-full bg-sand rounded-full h-3 mb-5 overflow-hidden">
        <div 
          className="bg-olive h-3 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-earth-500 text-xs">
          {hours >= goalHours ? '今日目标已达成，做得好！' : '专注当下，静心编码。'}
        </p>
        
        {/* 打卡按钮 */}
        <button 
          onClick={handleCheckIn}
          disabled={hours >= goalHours}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            hours >= goalHours 
              ? 'bg-earth-200 text-earth-400 cursor-not-allowed'
              : 'bg-forest text-earth-50 hover:bg-olive active:bg-olive/90'
          }`}
        >
          {hours >= goalHours ? '已打卡' : '打卡 1 小时'}
        </button>
      </div>
    </div>
  );
};

export default GameCheckIn;
