/**
 * src/utils/storage.js
 * 封装 LocalStorage 的数据读写操作（登录状态和打卡数据）
 */

const AUTH_KEY = 'app_auth_status';
const PUNCH_DATA_KEY = 'app_punch_data';
const NEXT_DESTINATION_KEY = 'app_next_destination';

export const storage = {
  // === 登录状态相关 ===
  
  /**
   * 设置登录状态
   * @param {string} role - 角色标识 ('admin' | 'viewer')
   */
  setLoginStatus: (role) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(role));
  },

  /**
   * 获取登录状态
   * @returns {string|boolean} 当前登录角色，未登录返回 false
   */
  getLoginStatus: () => {
    try {
      const status = localStorage.getItem(AUTH_KEY);
      if (!status) return false;
      const parsed = JSON.parse(status);
      // 兼容旧版本的 true 值，将其当作 'admin' 处理
      if (parsed === true || parsed === 'true') {
        return 'admin';
      }
      return parsed;
    } catch (e) {
      console.error('获取登录状态失败', e);
      return false;
    }
  },

  /**
   * 清除登录状态
   */
  clearLoginStatus: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // === 打卡数据相关 ===

  /**
   * 保存打卡数据
   * @param {Array|Object} data - 要保存的打卡数据
   */
  setPunchData: (data) => {
    localStorage.setItem(PUNCH_DATA_KEY, JSON.stringify(data));
  },

  /**
   * 获取打卡数据
   * @returns {Array|Object} 存储的打卡数据
   */
  getPunchData: () => {
    try {
      const data = localStorage.getItem(PUNCH_DATA_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('获取打卡数据失败', e);
      return [];
    }
  },

  /**
   * 清除打卡数据
   */
  clearPunchData: () => {
    localStorage.removeItem(PUNCH_DATA_KEY);
  },

  // === 地图下一站相关 ===

  /**
   * 保存下一站坐标
   * @param {Object} coords - {lat, lng} 对象
   */
  setNextDestination: (coords) => {
    localStorage.setItem(NEXT_DESTINATION_KEY, JSON.stringify(coords));
  },

  /**
   * 获取下一站坐标
   * @returns {Object|null} {lat, lng} 对象，没有则返回 null
   */
  getNextDestination: () => {
    try {
      const data = localStorage.getItem(NEXT_DESTINATION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('获取下一站坐标失败', e);
      return null;
    }
  }
};
