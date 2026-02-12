//主题预览
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
const ThemePreview = () => {
  const { theme } = useTheme();

  return (
    <div className="theme-preview">
      <h5>主题预览</h5>
      <div className="preview-container" style={{ 
        '--preview-primary': theme.primaryColor,
        '--preview-secondary': theme.secondaryColor,
        '--preview-bg': theme.backgroundColor,
        '--preview-text': theme.textColor,
        '--preview-radius': theme.borderRadius,
        '--preview-spacing': theme.spacingUnit
      }}>
        <div className="preview-widget">
          <div className="preview-header">
            <h6>预览组件</h6>
            <button className="preview-button">操作</button>
          </div>
          <div className="preview-content">
            <div className="preview-item">
              <span className="preview-label">标签</span>
              <span className="preview-value">值</span>
            </div>
            <div className="preview-progress">
              <div 
                className="progress-bar" 
                style={{ 
                  width: '60%',
                  backgroundColor: theme.primaryColor 
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="preview-colors">
          <div className="color-sample" style={{ backgroundColor: theme.primaryColor }}>
            <span>主色</span>
          </div>
          <div className="color-sample" style={{ backgroundColor: theme.secondaryColor }}>
            <span>辅色</span>
          </div>
          <div className="color-sample" style={{ 
            backgroundColor: theme.backgroundColor,
            border: `1px solid ${theme.textColor}20`
          }}>
            <span style={{ color: theme.textColor }}>背景</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;