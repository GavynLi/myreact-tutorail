//创建导入导出组件
// components/ThemeConfig/ThemeImportExport.jsx
import React, { useState, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeImportExport = () => {
  const { 
    exportTheme, 
    importThemeFromFile, 
    getThemePresets, 
    applyPresetTheme,
    themeHistory 
  } = useTheme();
  
  const [importStatus, setImportStatus] = useState({ type: '', message: '' });
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    try {
      const exported = exportTheme();
      setImportStatus({
        type: 'success',
        message: `主题"${exported.name}"导出成功！`
      });
    } catch (error) {
      setImportStatus({
        type: 'error',
        message: `导出失败: ${error.message}`
      });
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImportStatus({ type: 'loading', message: '正在导入主题...' });

    try {
      const importedTheme = await importThemeFromFile(file);
      setImportStatus({
        type: 'success',
        message: `成功导入主题"${importedTheme.name || '自定义主题'}"`
      });
      
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportStatus({
        type: 'error',
        message: `导入失败: ${error.message}`
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    } else {
      setImportStatus({
        type: 'error',
        message: '请拖放JSON格式的主题文件'
      });
    }
  };

  const downloadTemplate = () => {
    const template = {
      name: "自定义主题模板",
      description: "这是一个主题配置模板",
      version: "1.0.0",
      author: "您的名称",
      mode: "light",
      primaryColor: "#1890ff",
      secondaryColor: "#52c41a",
      backgroundColor: "#ffffff",
      textColor: "#262626",
      borderRadius: "8px",
      spacingUnit: "8px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
      schemaVersion: "1.0"
    };

    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-template.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="theme-import-export">
      <div className="section-header">
        <h4>主题导入/导出</h4>
      </div>

      {/* 状态消息 */}
      {importStatus.message && (
        <div className={`status-message ${importStatus.type}`}>
          {importStatus.message}
          {importStatus.type !== 'loading' && (
            <button 
              className="btn-close-status"
              onClick={() => setImportStatus({ type: '', message: '' })}
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* 导出部分 */}
      <div className="export-section">
        <h5>导出当前主题</h5>
        <p className="section-description">
          将当前主题配置导出为JSON文件，可以在其他设备或浏览器中导入使用
        </p>
        <button className="btn-export" onClick={handleExport}>
          📥 导出主题文件
        </button>
      </div>

      {/* 导入部分 */}
      <div className="import-section">
        <h5>导入主题文件</h5>
        <p className="section-description">
          从JSON文件导入主题配置，支持拖放操作
        </p>
        
        <div 
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="drop-content">
            <div className="drop-icon">📁</div>
            <p>点击或拖放JSON文件到这里</p>
            <small>支持.dashboard-theme.json或.json格式</small>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.dashboard-theme.json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>

        <div className="template-section">
          <button className="btn-template" onClick={downloadTemplate}>
            下载模板文件
          </button>
          <small>使用模板文件了解主题文件格式</small>
        </div>
      </div>

      {/* 预设主题 */}
      <div className="presets-section">
        <h5>预设主题</h5>
        <p className="section-description">
          快速应用预设的主题配置
        </p>
        <div className="preset-grid">
          {getThemePresets().map((preset, index) => (
            <div 
              key={index}
              className="preset-card"
              onClick={() => applyPresetTheme(preset.name)}
            >
              <div className="preset-colors">
                <div 
                  className="color-primary" 
                  style={{ backgroundColor: preset.primaryColor }}
                  title="主色调"
                />
                <div 
                  className="color-secondary" 
                  style={{ backgroundColor: preset.secondaryColor }}
                  title="辅色调"
                />
                <div 
                  className="color-bg" 
                  style={{ backgroundColor: preset.backgroundColor }}
                  title="背景色"
                />
                <div 
                  className="color-text" 
                  style={{ backgroundColor: preset.textColor }}
                  title="文字色"
                />
              </div>
              <div className="preset-info">
                <h6>{preset.name}</h6>
                <small>{preset.mode === 'light' ? '浅色' : '深色'}模式</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 历史记录 */}
      <div className="history-section">
        <div className="history-header">
          <h5>操作历史</h5>
          <button 
            className="btn-toggle-history"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? '收起' : '展开'}
          </button>
        </div>
        
        {showHistory && (
          <div className="history-list">
            {themeHistory.length === 0 ? (
              <p className="no-history">暂无历史记录</p>
            ) : (
              themeHistory.slice(0, 5).map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-action">
                    <span className={`action-badge ${item.action}`}>
                      {item.action === 'export' ? '导出' : '导入'}
                    </span>
                    <span className="theme-name">
                      {item.name || '自定义主题'}
                    </span>
                  </div>
                  <div className="history-time">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
            {themeHistory.length > 5 && (
              <div className="history-more">
                还有 {themeHistory.length - 5} 条记录...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeImportExport;