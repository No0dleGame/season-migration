import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 修复 Leaflet 默认 marker 图标丢失的问题 (Vite/Webpack 环境常见问题)
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// 自定义当前位置图标 (绿色)
const currentIcon = L.divIcon({
  className: 'custom-current-icon',
  html: `<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// 自定义目标点图标 (陶土色)
const targetIcon = L.divIcon({
  className: 'custom-target-icon',
  html: `<div style="background-color: #e2725b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/**
 * 监听地图中心更新的辅助组件
 * @param {Object} props
 * @param {Array} props.center - 地图中心坐标 [lat, lng]
 */
function MapCenterUpdater({ center }) {
  const map = useMap();
  const lat = center?.[0];
  const lng = center?.[1];

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.flyTo([lat, lng], map.getZoom(), { duration: 1.5 });
    }
  }, [lat, lng, map]); // 仅当经纬度数值真正改变时才触发重新聚焦，防止添加目标点等无关渲染导致重置视角
  return null;
}

/**
 * 监听地图点击事件的辅助组件
 * @param {Object} props
 * @param {Function} props.onMapClick - 地图点击回调函数
 */
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    mouseup(e) {
      // e.originalEvent.button === 1 代表鼠标中键（滚轮点击）
      if (e.originalEvent.button === 1) {
        onMapClick(e.latlng);
      }
    },
    contextmenu(e) {
      // 监听右键或移动端长按，兼顾手机端选点体验
      onMapClick(e.latlng);
    }
  });
  return null; // 该组件只负责监听事件，不渲染任何 DOM
}

/**
 * 旅游地图组件
 * @param {Object} props
 * @param {Object} props.currentLocation - 当前位置坐标 {lat, lon}
 * @param {string} props.role - 当前用户角色
 * @param {Array} props.targetPoints - 目标点数组
 * @param {Function} props.onAddTarget - 添加目标点的回调函数
 */
const TravelMap = ({ currentLocation, role, targetPoints = [], onAddTarget }) => {
  /**
   * 处理地图点击事件
   * @param {Object} latlng - 包含 lat 和 lng 的坐标对象
   */
  const handleMapClick = (latlng) => {
    if (onAddTarget) {
      onAddTarget({ lat: latlng.lat, lng: latlng.lng });
    }
  };

  // 默认中心点：如果有当前位置则使用，否则使用默认坐标 (如北京天安门附近)
  const defaultCenter = useMemo(() => {
    return currentLocation?.lat && currentLocation?.lon
      ? [currentLocation.lat, currentLocation.lon]
      : [39.9042, 116.4074];
  }, [currentLocation?.lat, currentLocation?.lon]);

  return (
    // 使用自然色系 (emerald-100) 边框、大圆角和柔和阴影适配整体 UI 风格
    <div className="w-full h-full absolute inset-0 z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ZoomControl position="bottomleft" />
        <MapCenterUpdater center={defaultCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 渲染当前位置标记 */}
        {currentLocation?.lat && currentLocation?.lon && (
          <Marker position={[currentLocation.lat, currentLocation.lon]} icon={currentIcon}>
            <Popup>当前位置</Popup>
          </Marker>
        )}

        {/* 渲染多个目标点标记 */}
        {targetPoints.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]} icon={targetIcon}>
            <Popup>
              <div className="font-medium">目标点 {index + 1}</div>
              {point.address && <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">{point.address}</div>}
            </Popup>
          </Marker>
        ))}

        {/* 只有当 role 为 'admin' 时绑定点击事件，通过 MapClickHandler 将点击坐标传递出来 */}
        {role === 'admin' && <MapClickHandler onMapClick={handleMapClick} />}
      </MapContainer>
    </div>
  );
};

export default React.memo(TravelMap);
