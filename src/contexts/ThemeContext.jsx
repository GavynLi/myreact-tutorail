//主题上下文
// contexts/ThemeContext.jsx
import React, { createContext, useState, useCallback,useContext, useEffect } from 'react';

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
      name: '默认主题',
      version: '1.0.0',
      author: '系统',
      description: '系统默认主题',
      createdAt: new Date().toISOString()
    };
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [themeHistory, setThemeHistory] = useState([]);


  //保存主题历史
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('theme-history')) || [];
    setThemeHistory(history);
  },[]);

  // 保存主题到localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-theme', JSON.stringify(theme));
    
    // 应用CSS变量到根元素
    const root = document.documentElement;
    // root.style.setProperty('--primary-color', theme.primaryColor);
    // root.style.setProperty('--secondary-color', theme.secondaryColor);
    // root.style.setProperty('--bg-color', theme.backgroundColor);
    // root.style.setProperty('--text-color', theme.textColor);
    // root.style.setProperty('--border-radius', theme.borderRadius);
    // root.style.setProperty('--spacing-unit', theme.spacingUnit);
    // root.style.setProperty('--font-family', theme.fontFamily);
    Object.keys(theme).forEach(key => {
      if(typeof theme[key] === 'string' && 
        (theme[key].startsWith('#')||
         theme[key].includes('px')||
         theme[key].includes('color')||
         theme[key].includes('ms')||
         theme[key].includes('border')||
         theme[key].includes('font')||
         theme[key].includes('radius')||
         theme[key].includes('spacing')))
         { 
           root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, theme[key]);
         }
    });
  }, 
  [theme]);

  const updateTheme = useCallback((updates) => {
    setTheme(prev => ({ ...prev, ...updates }));
  },[]); 

  const resetTheme = useCallback(() => {
    setTheme(getInitialTheme());
  },[]); ;
  //到处主题
  const exportTheme=useCallback(()=>{
     const themeData = {
      ...theme,
      exportedAt:new Date().toISOString(),
      schemaVersion:'1.0'
     };
     const dataStr=JSON.stringify(themeData,null,2);
     const dataBlob=new Blob([dataStr],{type:'application/json'});
     const url=URL.createObjectURL(dataBlob);
     const link=document.createElement('a');
     link.href=url;
     link.download=`dashboard-theme-${theme.name||'custom'}-${Date.now()}.json`;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     URL.revokeObjectURL(url);
      //添加到历史记录
      const newHistory=[
        {
          ...themeData,action:'export',timestamp:new Date().toISOString()},
          ...themeHistory.slice(0,9)
        
      ];

      setThemeHistory(newHistory);
      localStorage.setItem('theme-history',JSON.stringify(newHistory));
      return themeData;


  },[theme,themeHistory]);

  //导入主题
  const importTheme = useCallback((themeData) => {
    //验证主题数据
    if (!isValidTheme(themeData)) {
      throw new Error('无效的主题格式');
    }
    const importedTheme = {
      ...themeData,
      importedAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    //移除元数据字段
    delete importedTheme.exportedAt;
    delete importedTheme.importedAt;
    delete importedTheme.schemaVersion;
    setTheme(importedTheme);
    //添加到历史记录
    const newHistory = [
      {
        ...importedTheme,
        action: 'import',
        source: themeData.name || '未知主题',
        timestamp: new Date().toISOString()
      },
      ...themeHistory.slice(0, 9)
    ];
    setThemeHistory(newHistory);
    localStorage.setItem('theme-history', JSON.stringify(newHistory));
  }, [themeHistory]);
  const isValidTheme=(data)=>{
    if (!data || typeof data !== 'object') return false;
    
    const requiredFields = ['primaryColor', 'backgroundColor', 'textColor'];
    const optionalFields = ['mode', 'secondaryColor', 'borderRadius', 'spacingUnit', 'fontFamily'];
    
    // 检查必需字段
    for (const field of requiredFields) {
      if (!data[field] || typeof data[field] !== 'string') {
        return false;
      }
    }
    
    // 验证颜色格式
    const colorFields = ['primaryColor', 'secondaryColor', 'backgroundColor', 'textColor'];
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    
    for (const field of colorFields) {
      if (data[field] && !colorRegex.test(data[field])) {
        return false;
      }
    }
    
    return true;
  }
// 从文件导入
  const importThemeFromFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!file || file.type !== 'application/json') {
        reject(new Error('请选择JSON文件'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const themeData = JSON.parse(event.target.result);
          const validatedTheme = importTheme(themeData);
          resolve(validatedTheme);
        } catch (error) {
          reject(new Error(`解析主题文件失败: ${error.message}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('读取文件失败'));
      };

      reader.readAsText(file);
    });
  }, [importTheme]);

// 获取主题预设
  const getThemePresets = useCallback(() => {
    return [
      {
        name: '科技蓝',
        primaryColor: '#1890ff',
        secondaryColor: '#13c2c2',
        backgroundColor: '#ffffff',
        textColor: '#262626',
        mode: 'light',
        borderRadius: '8px',
        spacingUnit: '8px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
      },
      {
        name: '深邃黑',
        primaryColor: '#722ed1',
        secondaryColor: '#eb2f96',
        backgroundColor: '#1f1f1f',
        textColor: '#ffffff',
        mode: 'dark',
        borderRadius: '12px',
        spacingUnit: '12px',
        fontFamily: '"Helvetica Neue", Arial, sans-serif'
      },
      {
        name: '清新绿',
        primaryColor: '#52c41a',
        secondaryColor: '#a0d911',
        backgroundColor: '#f6ffed',
        textColor: '#135200',
        mode: 'light',
        borderRadius: '4px',
        spacingUnit: '8px',
        fontFamily: 'Georgia, "Times New Roman", serif'
      }
    ];
  }, []);

  // 应用预设主题
  const applyPresetTheme = useCallback((presetName) => {
    const presets = getThemePresets();
    const preset = presets.find(p => p.name === presetName);
    if (preset) {
      setTheme(preset);
    }
  }, [getThemePresets]);


  return (
    <ThemeContext.Provider value={{ theme
    , updateTheme
    , resetTheme 
    ,exportTheme,
    importTheme,
    importThemeFromFile,
    themeHistory,
    getThemePresets,
    applyPresetTheme,
    isValidTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);