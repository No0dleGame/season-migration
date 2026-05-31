/**
 * 根据当前月份获取季节
 * 3-5月为春日季
 * 6-8月为盛夏季
 * 9-11月为金秋季
 * 12-2月为凛冬季
 * @returns {string} 当前季节名称
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return '春日季';
  if (month >= 6 && month <= 8) return '盛夏季';
  if (month >= 9 && month <= 11) return '金秋季';
  return '凛冬季';
};
