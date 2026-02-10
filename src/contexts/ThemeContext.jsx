//主题上下文
// contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 从localStorage加载保存的主题，或使用默认主题
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return {
      mode: 'light', // 'light' | 'dark'
      primaryColor: '#1890ff',
      secondaryColor: '#52c41a',
      backgroundColor: '#ffffff',
      textColor: '#262626',
      borderRadius: '8px',
      spacingUnit: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    };
  };

  const [theme, setTheme] = useState(getInitialTheme());

  // 保存主题到localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-theme', JSON.stringify(theme));
    
    // 应用CSS变量到根元素
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--bg-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--spacing-unit', theme.spacingUnit);
    root.style.setProperty('--font-family', theme.fontFamily);
  }, [theme]);

  const updateTheme = (updates) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(getInitialTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);