import { useState, useCallback } from 'react';
import { getCurrentPosition, getCityName, getWeather } from '../utils/locationService';

export const useLocationAndWeather = () => {
  const [locationData, setLocationData] = useState({
    city: '',
    temp: '',
    weather: '',
    coords: null,
    loading: false,
    error: null
  });

  const fetchLocationAndWeather = useCallback(async () => {
    setLocationData(prev => ({ ...prev, loading: true, error: null }));
    try {
      // 请求浏览器定位权限
      const { lat, lon } = await getCurrentPosition();
      // 并行请求城市名称、详细地址和天气数据以提升速度
      const [city, detailedAddress, weather] = await Promise.all([
        getCityName(lat, lon),
        getAddressDetail(lat, lon),
        getWeather(lat, lon)
      ]);
      
      setLocationData({
        city: city,
        detailedAddress: detailedAddress,
        temp: `${weather.temperature}°C`,
        weather: weather.description,
        coords: { lat, lon },
        loading: false,
        error: null
      });
    } catch (err) {
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: err.message || '获取定位失败'
      }));
    }
  }, []);

  return { locationData, fetchLocationAndWeather };
};
