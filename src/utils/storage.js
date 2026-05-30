/**
 * src/utils/storage.js
 * 封装 LocalStorage 的数据读写操作（登录状态和打卡数据）
 */

const AUTH_KEY = 'app_auth_status';
const PUNCH_DATA_KEY = 'app_punch_data';

export const storage = {
  // === 登录状态相关 ===
  
  /**
   * 设置登录状态
   * @param {boolean} status - 是否已登录
   */
  setLoginStatus: (status) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(status));
  },

  /**
   * 获取登录状态
   * @returns {boolean} 当前登录状态
   */
  getLoginStatus: () => {
    try {
      const status = localStorage.getItem(AUTH_KEY);
      return status ? JSON.parse(status) : false;
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
  }
};
