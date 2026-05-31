import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

/**
 * 行程移动打卡卡片组件
 * 提供地点名称输入与营地/城市住宿选择功能
 * 采用自然人文风格，适配移动端
 */
const LocationCheckIn = ({ onCheckIn, defaultLocation, onRefresh }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (defaultLocation) {
      setIsSubmitted(true);
      
      // 保存到 localStorage
      const currentData = storage.getPunchData();
      const newRecord = {
        id: Date.now().toString(),
        type: 'location',
        location: defaultLocation,
        accType: 'current',
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
  };

  return (
    <div className="bg-earth-50 rounded-xl p-4 shadow-sm border border-earth-200">
      <div className="flex items-center gap-1.5 mb-3">
        <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <h3 className="text-forest font-bold text-base">行程驻地</h3>
      </div>

      {isSubmitted ? (
        // 打卡成功状态展示
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-olive/10 mb-2">
            <svg className="w-5 h-5 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-earth-800 font-medium text-sm">驻地更新成功</p>
          <p className="text-earth-500 text-xs mt-1">
            当前驻地：{defaultLocation || '未知地点'}
          </p>
          <button 
            onClick={handleReset}
            className="mt-3 text-terracotta text-xs underline underline-offset-4"
          >
            新地点打卡
          </button>
        </div>
      ) : (
        // 打卡表单
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="bg-white rounded-xl p-3 border border-earth-100 flex flex-col items-center justify-center space-y-1.5">
            <div className="text-earth-500 text-[10px]">当前定位</div>
            <div className="text-earth-800 font-bold text-sm text-center line-clamp-2">
              {defaultLocation || '定位中...'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="w-full bg-white text-earth-700 border border-earth-200 rounded-lg py-2 text-xs font-medium hover:bg-earth-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              刷新定位
            </button>
            <button
              type="submit"
              disabled={!defaultLocation}
              className="w-full bg-earth-800 text-earth-50 rounded-lg py-2 text-xs font-medium hover:bg-earth-900 active:bg-earth-900/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              打卡当前驻地
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LocationCheckIn;
