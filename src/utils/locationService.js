/**
 * 获取当前设备的地理位置
 * 封装 navigator.geolocation.getCurrentPosition 为 Promise
 * @returns {Promise<{lat: number, lon: number}>} 返回包含纬度和经度的对象
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('当前浏览器不支持地理位置服务'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * 根据经纬度获取城市名称
 * 调用 OpenStreetMap Nominatim 接口进行逆地理编码
 * @param {number} lat - 纬度
 * @param {number} lon - 经度
 * @returns {Promise<string>} 返回城市名称
 */
export const getCityName = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.9',
        // Nominatim 要求提供 User-Agent
        'User-Agent': 'SeasonMigrationApp/1.0',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // 尝试从 address 中获取城市相关的名称
    const address = data.address || {};
    const city = address.city || address.town || address.village || address.county || address.state || '未知城市';
    return city;
  } catch (error) {
    console.error('获取城市名称失败:', error);
    throw error;
  }
};

/**
 * 根据经纬度获取详细地址
 * 调用 OpenStreetMap Nominatim 接口进行逆地理编码
 * @param {number} lat - 纬度
 * @param {number} lon - 经度
 * @returns {Promise<string>} 返回详细地址
 */
export const getAddressDetail = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'User-Agent': 'SeasonMigrationApp/1.0',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.display_name || '未知地址';
  } catch (error) {
    console.error('获取详细地址失败:', error);
    return '未知地址';
  }
};

/**
 * 天气代码映射表 (WMO Weather interpretation codes)
 * 根据 Open-Meteo 官方文档映射为中文描述
 */
const weatherCodeMap = {
  0: '晴朗',
  1: '大部晴朗',
  2: '多云',
  3: '阴天',
  45: '雾',
  48: '结霜的雾',
  51: '毛毛雨（轻微）',
  53: '毛毛雨（中等）',
  55: '毛毛雨（密集）',
  56: '冻毛毛雨（轻微）',
  57: '冻毛毛雨（密集）',
  61: '雨（轻微）',
  63: '雨（中等）',
  65: '雨（大）',
  66: '冻雨（轻微）',
  67: '冻雨（大）',
  71: '雪（轻微）',
  73: '雪（中等）',
  75: '雪（大）',
  77: '雪粒',
  80: '阵雨（轻微）',
  81: '阵雨（中等）',
  82: '阵雨（剧烈）',
  85: '阵雪（轻微）',
  86: '阵雪（大）',
  95: '雷暴',
  96: '雷暴伴有轻微冰雹',
  99: '雷暴伴有严重冰雹',
};

/**
 * 根据经纬度获取当前天气信息
 * 调用 Open-Meteo API 获取当前温度和天气代码，并映射为天气描述
 * @param {number} lat - 纬度
 * @param {number} lon - 经度
 * @returns {Promise<{temperature: number, description: string, code: number}>} 天气信息对象
 */
export const getWeather = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const current = data.current;
    
    if (!current) {
      throw new Error('未获取到当前天气数据');
    }
    
    const temperature = current.temperature_2m;
    const weatherCode = current.weather_code;
    const description = weatherCodeMap[weatherCode] || '未知天气';
    
    return {
      temperature,
      description,
      code: weatherCode,
    };
  } catch (error) {
    console.error('获取天气信息失败:', error);
    throw error;
  }
};
