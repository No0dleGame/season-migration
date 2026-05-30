import React, { useState } from 'react';
import { storage } from '../utils/storage';

/**
 * 密码登录组件
 * @param {Object} props
 * @param {Function} props.onLoginSuccess - 登录成功后的回调函数，传入角色标识
 */
const Login = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 定义不同角色的访问密码
  const ADMIN_PASSWORD = '19991123'; 
  const VIEWER_PASSWORD = '12345678';

  /**
   * 处理密码输入事件，实时校验
   */
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError('');

    // 实时判断密码，如果匹配则触发登录成功逻辑
    if (value === ADMIN_PASSWORD) {
      storage.setLoginStatus('admin');
      if (onLoginSuccess) {
        onLoginSuccess('admin');
      }
    } else if (value === VIEWER_PASSWORD) {
      storage.setLoginStatus('viewer');
      if (onLoginSuccess) {
        onLoginSuccess('viewer');
      }
    } else if (value.length >= 8) {
      // 密码长度达到8位仍不匹配时，提示错误
      setError('密码错误，请重试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          系统登录
        </h2>
        <div className="space-y-5">
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              访问密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="请输入访问密码"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
          
          {/* 错误提示信息 */}
          {error && (
            <p className="text-red-500 text-sm animate-pulse">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
