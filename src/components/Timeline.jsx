import React from 'react';
import { Clock, MapPin, Code } from 'lucide-react';

/**
 * 历史记录时间轴组件
 * 读取并展示打卡数据
 */
const Timeline = ({ punchData = [] }) => {
  if (!punchData || punchData.length === 0) {
    return (
      <div className="bg-earth-50 rounded-xl p-4 shadow-sm border border-earth-200 text-center">
        <Clock className="w-6 h-6 text-earth-300 mx-auto mb-2" />
        <p className="text-earth-500 text-xs">暂无打卡记录，开始你的旅程吧</p>
      </div>
    );
  }

  return (
    <div className="bg-earth-50 rounded-xl p-4 shadow-sm border border-earth-200">
      <h3 className="text-forest font-bold text-base mb-4 flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-terracotta" />
        旅程足迹
      </h3>
      
      <div className="relative border-l border-earth-200 ml-2 space-y-4">
        {punchData.slice().reverse().map((item) => (
          <div key={item.id} className="relative pl-5">
            {/* 时间轴节点图标 */}
            <div className="absolute -left-[9px] top-1 bg-earth-50 rounded-full p-0.5">
              {item.type === 'game' ? (
                <div className="bg-olive rounded-full p-1">
                  <Code className="w-2.5 h-2.5 text-white" />
                </div>
              ) : (
                <div className="bg-terracotta rounded-full p-1">
                  <MapPin className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            {/* 内容卡片 */}
            <div className="bg-white rounded-lg p-3 shadow-sm border border-earth-100">
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-medium text-xs text-earth-800">
                  {item.type === 'game' ? '游戏开发修行' : '行程驻地'}
                </span>
                <span className="text-[10px] text-earth-400">
                  {new Date(item.timestamp).toLocaleString('zh-CN', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <div className="text-[10px] text-earth-600">
                {item.type === 'game' ? (
                  <p>打卡专注 <span className="text-olive font-medium">{item.value}</span> 小时</p>
                ) : (
                  <p>
                    驻地：<span className="font-medium">{item.location}</span>
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-earth-100 text-earth-600">
                      {item.accType === 'camp' ? '野外露营' : '城市住宿'}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
