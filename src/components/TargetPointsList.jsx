import React from 'react';

/**
 * 目标点列表组件
 * 展示在地图右侧，使用毛玻璃效果
 */
const TargetPointsList = ({ targetPoints, onRemove }) => {
  if (!targetPoints || targetPoints.length === 0) return null;

  return (
    <div className="absolute top-20 right-4 z-40 w-80 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="text-forest font-bold text-lg">行程目标点</h3>
      </div>
      
      <div className="space-y-3">
        {targetPoints.map((point, index) => (
          <div key={index} className="flex items-center justify-between bg-white/60 border border-earth-100 rounded-xl p-3 shadow-sm">
            <div>
              <div className="text-earth-800 font-medium text-sm mb-1">目标点 {index + 1}</div>
              <div className="text-earth-500 text-xs font-mono">
                {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-1.5 text-earth-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="删除目标点"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetPointsList;
