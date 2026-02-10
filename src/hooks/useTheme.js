// 自定义主题Hook
// hooks/useTheme.js
import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useThemeEffect = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // 根据主题模式切换body类
    document.body.classList.toggle('dark-mode', theme.mode === 'dark');
    
    // 生成动态CSS变量
    const style = document.documentElement.style;
    Object.keys(theme).forEach(key => {
      if (typeof theme[key] === 'string' && theme[key].includes('px') || theme[key].includes('#')) {
        style.setProperty(`--${key}`, theme[key]);
      }
    });
  }, [theme]);
};