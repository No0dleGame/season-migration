import React, { useState } from 'react';
import { storage } from '../utils/storage';

/**
 * 行程移动打卡卡片组件
 * 提供地点名称输入与营地/城市住宿选择功能
 * 采用自然人文风格，适配移动端
 */
const LocationCheckIn = ({ onCheckIn }) => {
  const [locationName, setLocationName] = useState('');
  const [accType, setAccType] = useState('camp'); // 住宿类型：'camp' 野外露营, 'city' 城市住宿
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationName.trim()) {
      setIsSubmitted(true);
      
      // 保存到 localStorage
      const currentData = storage.getPunchData();
      const newRecord = {
        id: Date.now().toString(),
        type: 'location',
        location: locationName.trim(),
        accType,
        timestamp: Date.now()
      };
      storage.setPunchData([...currentData, newRecord]);
      
      // 触发父组件更新
      if (onCheckIn) {
        onCheckIn();
      }
    }
  };

  // 重置表单
  const handleReset = () => {
    setIsSubmitted(false);
    setLocationName('');
    setAccType('camp');
  };

  return (
    <div className="bg-earth-50 rounded-2xl p-5 shadow-sm border border-earth-200 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <h3 className="text-forest font-bold text-lg">行程驻地</h3>
      </div>

      {isSubmitted ? (
        // 打卡成功状态展示
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-olive/10 mb-3">
            <svg className="w-6 h-6 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-earth-800 font-medium">驻地更新成功</p>
          <p className="text-earth-500 text-sm mt-1">
            当前驻地：{locationName} ({accType === 'camp' ? '野外露营' : '城市住宿'})
          </p>
          <button 
            onClick={handleReset}
            className="mt-4 text-terracotta text-sm underline underline-offset-4"
          >
            新地点打卡
          </button>
        </div>
      ) : (
        // 打卡表单
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-earth-700 text-sm font-medium mb-1">
              地点名称
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="例如：大理洱海边"
              className="w-full bg-white border border-earth-200 rounded-lg px-3 py-2 text-earth-800 placeholder-earth-400 focus:outline-none focus:border-olive focus:ring-1 focus:ring-olive transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-earth-700 text-sm font-medium mb-2">
              住宿类型
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* 野外露营选择项 */}
              <button
                type="button"
                onClick={() => setAccType('camp')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  accType === 'camp'
                    ? 'border-olive bg-olive/10 text-olive'
                    : 'border-earth-200 bg-white text-earth-500 hover:bg-earth-100'
                }`}
              >
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="text-sm font-medium">野外露营</span>
              </button>
              
              {/* 城市住宿选择项 */}
              <button
                type="button"
                onClick={() => setAccType('city')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  accType === 'city'
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-earth-200 bg-white text-earth-500 hover:bg-earth-100'
                }`}
              >
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm font-medium">城市住宿</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-earth-800 text-earth-50 rounded-lg py-2.5 font-medium hover:bg-earth-900 active:bg-earth-900/90 transition-colors"
          >
            确认更新
          </button>
        </form>
      )}
    </div>
  );
};

export default LocationCheckIn;
