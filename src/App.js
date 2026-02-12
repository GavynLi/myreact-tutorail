import React,{useEffect}  from 'react';
import {ThemeProvider} from './contexts/ThemeContext';
import Dashboard from './components/Dashboard/Dashboard';
import  './styles/global.css';
function App() {
  // 调试：检查组件是否挂载
  useEffect(() => {
    console.log('App组件已挂载');
    console.log('当前路径:', window.location.pathname);
  }, []);
  return (
    <ThemeProvider>
      <div className="App">
        {/* <h1>欢迎来到我的仪表板</h1> */}
      <Dashboard />
      </div>
      
    </ThemeProvider>
  );
}

export default App;
