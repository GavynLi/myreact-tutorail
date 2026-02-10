//仪表板头部
// components/Dashboard/DashboardHeader.jsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const DashboardHeader = ({ 
  onThemeConfigClick, 
  onExportClick,
  onImportClick,
  userName = '用户',
  showNotifications = true 
}) => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

  // 通知数据
  const notificationItems = [
    { id: 1, title: '系统更新', message: 'Dashboard已更新到v2.0', time: '10分钟前', unread: true },
    { id: 2, title: '新消息', message: '您有5条未读消息', time: '1小时前', unread: true },
    { id: 3, title: '备份提醒', message: '系统备份已完成', time: '昨天', unread: false },
  ];

  // 用户菜单选项
  const userMenuItems = [
    { id: 1, label: '个人资料', icon: '👤' },
    { id: 2, label: '设置', icon: '⚙️' },
    { id: 3, label: '帮助中心', icon: '❓' },
    { id: 4, label: '退出登录', icon: '🚪', danger: true },
  ];

  const clearAllNotifications = () => {
    setNotifications(0);
    setShowNotificationsMenu(false);
  };

  return (
    <header className="dashboard-header">
      {/* 左侧：Logo和标题 */}
      <div className="header-left">
        <div 
          className="logo" 
          style={{ 
            backgroundColor: theme.primaryColor,
            color: theme.mode === 'dark' ? '#000' : '#fff'
          }}
        >
          D
        </div>
        <div className="header-title">
          <h1>数据分析仪表板</h1>
          <p className="subtitle">实时监控与可视化分析平台</p>
        </div>
      </div>

      {/* 中间：搜索框 */}
      <div className="header-center">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="搜索指标、报表或设置..." 
            className="search-input"
          />
          <button className="search-btn">搜索</button>
        </div>
      </div>

      {/* 右侧：操作按钮和用户信息 */}
      <div className="header-right">
        {/* 主题配置按钮 */}
        <button 
          className="header-btn theme-btn"
          onClick={onThemeConfigClick}
          title="主题设置"
          style={{
            backgroundColor: theme.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.05)',
            color: theme.textColor
          }}
        >
          <span className="btn-icon">🎨</span>
          <span className="btn-text">主题</span>
        </button>

        {/* 导入/导出按钮 */}
        <div className="theme-actions-dropdown">
          <button 
            className="header-btn import-export-btn"
            title="导入/导出主题"
            style={{
              backgroundColor: theme.mode === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(0,0,0,0.05)',
              color: theme.textColor
            }}
          >
            <span className="btn-icon">📤</span>
          </button>
          <div className="dropdown-menu">
            <button 
              className="dropdown-item"
              onClick={onExportClick}
            >
              <span className="item-icon">📥</span>
              导出主题
            </button>
            <button 
              className="dropdown-item"
              onClick={onImportClick}
            >
              <span className="item-icon">📁</span>
              导入主题
            </button>
          </div>
        </div>

        {/* 通知按钮 */}
        {showNotifications && (
          <div className="notifications-dropdown">
            <button 
              className="header-btn notifications-btn"
              onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
              title="通知"
              style={{
                backgroundColor: theme.mode === 'dark' 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'rgba(0,0,0,0.05)',
                color: theme.textColor
              }}
            >
              <span className="btn-icon">🔔</span>
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>
            
            {showNotificationsMenu && (
              <div className="notifications-menu">
                <div className="notifications-header">
                  <h4>通知</h4>
                  <button 
                    className="clear-btn"
                    onClick={clearAllNotifications}
                  >
                    全部已读
                  </button>
                </div>
                
                <div className="notifications-list">
                  {notificationItems.map(item => (
                    <div 
                      key={item.id} 
                      className={`notification-item ${item.unread ? 'unread' : ''}`}
                      onClick={() => {
                        const updatedItems = notificationItems.map(n => 
                          n.id === item.id ? { ...n, unread: false } : n
                        );
                        // 这里可以更新未读数量
                        if (item.unread) {
                          setNotifications(prev => Math.max(0, prev - 1));
                        }
                      }}
                    >
                      <div className="notification-icon">📢</div>
                      <div className="notification-content">
                        <div className="notification-title">{item.title}</div>
                        <div className="notification-message">{item.message}</div>
                        <div className="notification-time">{item.time}</div>
                      </div>
                      {item.unread && <div className="unread-dot"></div>}
                    </div>
                  ))}
                </div>
                
                <div className="notifications-footer">
                  <button className="view-all-btn">查看所有通知</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 用户信息 */}
        <div className="user-dropdown">
          <button 
            className="user-info"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ color: theme.textColor }}
          >
            <div 
              className="user-avatar"
              style={{ 
                backgroundColor: theme.primaryColor,
                color: theme.mode === 'dark' ? '#000' : '#fff'
              }}
            >
              {userName.charAt(0)}
            </div>
            <div className="user-details">
              <span className="user-name">{userName}</span>
              <span className="user-role">管理员</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>
          
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-header">
                <div 
                  className="menu-avatar"
                  style={{ 
                    backgroundColor: theme.primaryColor,
                    color: theme.mode === 'dark' ? '#000' : '#fff'
                  }}
                >
                  {userName.charAt(0)}
                </div>
                <div className="menu-user-info">
                  <div className="menu-user-name">{userName}</div>
                  <div className="menu-user-email">admin@dashboard.com</div>
                </div>
              </div>
              
              <div className="user-menu-items">
                {userMenuItems.map(item => (
                  <button 
                    key={item.id}
                    className={`menu-item ${item.danger ? 'danger' : ''}`}
                    onClick={() => {
                      setShowUserMenu(false);
                      if (item.id === 4) {
                        // 退出登录逻辑
                        console.log('退出登录');
                      }
                    }}
                  >
                    <span className="menu-item-icon">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 主题模式切换 */}
        <button 
          className="theme-mode-toggle"
          onClick={() => {
            // 这里可以通过上下文切换主题模式
            console.log('切换主题模式');
          }}
          title="切换主题模式"
          style={{
            backgroundColor: theme.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.05)',
            color: theme.textColor
          }}
        >
          {theme.mode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;