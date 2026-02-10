// 主题工具函数
// utils/themeUtils.js
export const exportTheme = (theme) => {
  const dataStr = JSON.stringify(theme, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportLink = document.createElement('a');
  exportLink.href = dataUri;
  exportLink.download = `dashboard-theme-${new Date().getTime()}.json`;
  exportLink.click();
};

export const importTheme = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const theme = JSON.parse(e.target.result);
        resolve(theme);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};