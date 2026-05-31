import React, { useState } from 'react';

/**
 * 目标点列表组件
 * 展示在地图右侧，使用毛玻璃效果
 */
const TargetPointsList = ({ targetPoints, onRemove, onToggle, onUpdateTime }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (address, index) => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-3 max-h-[calc(100vh-6rem)] overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-forest font-bold text-base">行程目标点</h3>
        </div>
      </div>
      
      {(!targetPoints || targetPoints.length === 0) ? (
        <div className="text-center text-xs text-earth-500 py-3">暂无目标点，点击地图添加或导入计划</div>
      ) : (
        <div className="space-y-2">
          {targetPoints.map((point, index) => (
            <div key={index} className={`flex items-center justify-between border rounded-xl p-2.5 shadow-sm transition-colors ${point.checkedIn ? 'bg-gray-50/60 border-gray-200' : 'bg-white/60 border-earth-100'}`}>
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <input 
                  type="checkbox" 
                  checked={!!point.checkedIn} 
                  onChange={() => onToggle && onToggle(index)}
                  className="w-3.5 h-3.5 mt-0.5 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer shrink-0"
                  title="标记为已打卡"
                />
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <h3 className={`font-semibold text-xs ${point.checkedIn ? 'text-gray-400 line-through' : 'text-earth-800'}`}>
                    {point.fromExcel ? 'Excel 计划点' : `目标点 ${index + 1}`}
                  </h3>
                  {point.address ? (
                    <div className="flex items-center gap-1">
                      <p className={`text-[10px] line-clamp-2 flex-1 min-w-0 ${point.checkedIn ? 'text-gray-400' : 'text-earth-500'}`} title={point.address}>
                        {point.address}
                      </p>
                      <button 
                        onClick={() => handleCopy(point.address, index)}
                        className="p-1 text-earth-400 hover:text-emerald-600 transition-colors shrink-0"
                        title="复制地址"
                      >
                        {copiedIndex === index ? (
                          <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ) : (
                    <p className={`text-[10px] font-mono ${point.checkedIn ? 'text-gray-400' : 'text-earth-500'}`}>
                      {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-earth-400 shrink-0">预计时间:</span>
                    <input 
                      type="text"
                      placeholder="如: 第四周"
                      value={point.estimatedTime || ''}
                      onChange={(e) => onUpdateTime && onUpdateTime(index, e.target.value)}
                      className={`text-[10px] px-1.5 py-0.5 border rounded w-full bg-white/50 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${point.checkedIn ? 'text-gray-400 border-gray-200' : 'text-earth-700 border-earth-200'}`}
                      disabled={point.checkedIn}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="p-1 text-earth-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1.5 shrink-0 self-start"
                title="删除目标点"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TargetPointsList;
