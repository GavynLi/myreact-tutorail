import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeConfigPanel from '../ThemeConfig/ThemeConfigPanel';
import Widget from './Widget';
//import DashboardHeader from './DashboardHeader';

const Dashboard = React.memo(() => {
  const { theme } = useTheme();
  const [showThemePanel, setShowThemePanel] = useState(false);

  // 应用CSS变量样式
  const dashboardStyle = {
    '--primary': theme.primaryColor,
    '--secondary': theme.secondaryColor,
    '--bg': theme.backgroundColor,
    '--text': theme.textColor,
    '--radius': theme.borderRadius,
    '--spacing': theme.spacingUnit,
    '--font': theme.fontFamily,
  };

  return (
    // <div className={`dashboard ${theme.mode}-mode`} style={dashboardStyle}>
    //   {/* <DashboardHeader onThemeClick={() => setShowThemePanel(true)} /> */}
      
    //   <div className="dashboard-content">
    //     <Widget title="数据概览" type="chart">
    //       {/* 图表内容 */}
    //       <h1>图标内容</h1>
    //     </Widget>
        
    //     <Widget title="关键指标" type="metric">
    //       {/* 指标内容 */}
    //     </Widget>
        
    //     <Widget title="最近活动" type="table">
    //       {/* 表格内容 */}
    //     </Widget>
    //   </div>

    //   <ThemeConfigPanel 
    //     isOpen={showThemePanel}
    //     onClose={() => setShowThemePanel(false)}
    //   />
    // </div>
  <div className="dashboard">
      <header className="dashboard-header">
        <h1>仪表板</h1>
        <div className="header-actions">
          <button 
            className="btn-theme"
            onClick={() => setShowThemePanel(true)}
            title="主题设置"
          >
            🎨 主题设置
          </button>
          <button 
            className="btn-export"
            // onClick={exportTheme}
            title="导出主题"
          >
            📥 导出
          </button>
        </div>
      </header>
      
      {/* Dashboard内容 */}
      
      <ThemeConfigPanel 
        isOpen={showThemePanel}
        onClose={() => setShowThemePanel(false)}
      />
    </div>

  );
});

export default Dashboard;