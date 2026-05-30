import React, { useState } from 'react';
import { storage } from '../utils/storage';

/**
 * 单密码登录组件
 * @param {Object} props
 * @param {Function} props.onLoginSuccess - 登录成功后的回调函数
 */
const Login = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 设置一个固定的系统访问密码
  const SYSTEM_PASSWORD = '19991123'; 

  /**
   * 处理登录提交事件
   */
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SYSTEM_PASSWORD) {
      // 密码正确，保存登录状态
      storage.setLoginStatus(true);
      setError('');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      // 密码错误，显示提示信息
      setError('密码错误，请重试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          系统登录
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
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
              onChange={(e) => setPassword(e.target.value)}
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
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            进入系统
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
