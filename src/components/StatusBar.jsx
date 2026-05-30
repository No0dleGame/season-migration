import React from 'react';

/**
 * 顶部状态栏组件
 * 展示当前所在地、季节提示以及别克E5周日移动提醒
 * 采用自然人文风格，适配移动端
 */
const StatusBar = ({ location = '云南·大理', season = '春日季', showReminder = true }) => {
  return (
    <div className="bg-earth-100 px-4 py-3 shadow-sm flex flex-col gap-2 rounded-b-2xl max-w-md mx-auto">
      <div className="flex justify-between items-center">
        {/* 当前所在地 */}
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-earth-800 font-medium text-sm">{location}</span>
        </div>
        
        {/* 季节提示 */}
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="text-earth-700 text-sm">{season}</span>
        </div>
      </div>
      
      {/* 别克E5周日移动提醒 */}
      {showReminder && (
        <div className="bg-terracotta/10 rounded-lg p-2 flex items-center gap-2 mt-1">
          <svg className="w-4 h-4 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-terracotta text-xs font-medium leading-tight">
            别克E5周日移动提醒：请安排拔营/城市移动
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
