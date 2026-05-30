import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { storage } from '../utils/storage';

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

/**
 * 监听地图点击事件的辅助组件
 * @param {Object} props
 * @param {Function} props.onMapClick - 地图点击回调函数
 */
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null; // 该组件只负责监听事件，不渲染任何 DOM
}

/**
 * 旅游地图组件
 * @param {Object} props
 * @param {Object} props.currentLocation - 当前位置坐标 {lat, lon}
 * @param {string} props.role - 当前用户角色
 */
export default function TravelMap({ currentLocation, role }) {
  // 本地 state 保存下一站的坐标 {lat, lng}
  const [nextDestination, setNextDestination] = useState(null);

  // 组件挂载时，从 storage 初始化下一站数据
  useEffect(() => {
    const savedDest = storage.getNextDestination();
    if (savedDest) {
      setNextDestination(savedDest);
    }
  }, []);

  /**
   * 处理地图点击事件
   * @param {Object} latlng - 包含 lat 和 lng 的坐标对象
   */
  const handleMapClick = (latlng) => {
    const coords = { lat: latlng.lat, lng: latlng.lng };
    // 1. 更新本地 state，以便在地图上显示标记
    setNextDestination(coords);
    // 2. 调用 storage 存储下一站，实现数据持久化
    storage.setNextDestination(coords);
  };

  // 默认中心点：如果有当前位置则使用，否则使用默认坐标 (如北京天安门附近)
  const defaultCenter = currentLocation?.lat && currentLocation?.lon
    ? [currentLocation.lat, currentLocation.lon]
    : [39.9042, 116.4074];

  return (
    // 使用自然色系 (emerald-100) 边框、大圆角和柔和阴影适配整体 UI 风格
    <div className="w-full h-full absolute inset-0 z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 渲染当前位置标记 */}
        {currentLocation?.lat && currentLocation?.lon && (
          <Marker position={[currentLocation.lat, currentLocation.lon]}>
            <Popup>当前位置</Popup>
          </Marker>
        )}

        {/* 渲染点击生成的下一站标记 */}
        {nextDestination?.lat && nextDestination?.lng && (
          <Marker position={[nextDestination.lat, nextDestination.lng]}>
            <Popup>下一站</Popup>
          </Marker>
        )}

        {/* 只有当 role 为 'admin' 时绑定点击事件，通过 MapClickHandler 将点击坐标传递出来 */}
        {role === 'admin' && <MapClickHandler onMapClick={handleMapClick} />}
      </MapContainer>
    </div>
  );
}
