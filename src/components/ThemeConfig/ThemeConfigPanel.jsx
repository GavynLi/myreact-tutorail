// 主题配置面板
// components/ThemeConfig/ThemeConfigPanel.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ColorPicker from './ColorPicker';

const ThemeConfigPanel = ({ isOpen, onClose }) => {
  const { theme, updateTheme } = useTheme();

  const handleColorChange = (key, value) => {
    updateTheme({ [key]: value });
  };

  const toggleMode = () => {
    const newMode = theme.mode === 'light' ? 'dark' : 'light';
    const updates = {
      mode: newMode,
      backgroundColor: newMode === 'dark' ? '#1f1f1f' : '#ffffff',
      textColor: newMode === 'dark' ? '#ffffff' : '#262626'
    };
    updateTheme(updates);
  };

  return (
    <div className={`theme-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h3>主题设置</h3>
        <button onClick={onClose}>×</button>
      </div>

      <div className="panel-content">
        <div className="form-group">
          <label>主题模式</label>
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${theme.mode === 'light' ? 'active' : ''}`}
              onClick={() => toggleMode()}
            >
              浅色模式
            </button>
            <button 
              className={`mode-btn ${theme.mode === 'dark' ? 'active' : ''}`}
              onClick={() => toggleMode()}
            >
              深色模式
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>主色调</label>
          <ColorPicker 
            color={theme.primaryColor}
            onChange={(color) => handleColorChange('primaryColor', color)}
          />
        </div>

        <div className="form-group">
          <label>辅色调</label>
          <ColorPicker 
            color={theme.secondaryColor}
            onChange={(color) => handleColorChange('secondaryColor', color)}
          />
        </div>

        <div className="form-group">
          <label>圆角大小</label>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={parseInt(theme.borderRadius)}
            onChange={(e) => handleColorChange('borderRadius', `${e.target.value}px`)}
          />
          <span>{theme.borderRadius}</span>
        </div>

        <div className="form-group">
          <label>间距单位</label>
          <select 
            value={theme.spacingUnit}
            onChange={(e) => handleColorChange('spacingUnit', e.target.value)}
          >
            <option value="4px">紧密</option>
            <option value="8px">标准</option>
            <option value="12px">宽松</option>
            <option value="16px">宽敞</option>
          </select>
        </div>

        <div className="form-group">
          <label>字体</label>
          <select 
            value={theme.fontFamily}
            onChange={(e) => handleColorChange('fontFamily', e.target.value)}
          >
            <option value='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'>系统字体</option>
            <option value='"Helvetica Neue", Arial, sans-serif'>Helvetica</option>
            <option value='Georgia, "Times New Roman", serif'>Georgia</option>
            <option value='"Courier New", monospace'>等宽字体</option>
          </select>
        </div>

        <div className="panel-actions">
          <button 
            className="btn-reset"
            onClick={() => {
              localStorage.removeItem('dashboard-theme');
              window.location.reload();
            }}
          >
            重置为默认
          </button>
          <button className="btn-apply" onClick={onClose}>
            应用主题
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfigPanel;