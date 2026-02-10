//颜色选色器
// components/ThemeConfig/ColorPicker.jsx
import React, { useState } from 'react';

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const colors = [
    '#1890ff', '#52c41a', '#f5222d', '#fa8c16',
    '#13c2c2', '#722ed1', '#eb2f96', '#faad14',
    '#a0d911', '#1890ff'
  ];

  return (
    <div className="color-picker">
      <div 
        className="color-preview" 
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker(!showPicker)}
      />
      
      {showPicker && (
        <div className="color-palette">
          <input 
            type="color" 
            value={color}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="preset-colors">
            {colors.map((presetColor, index) => (
              <button
                key={index}
                className="color-swatch"
                style={{ backgroundColor: presetColor }}
                onClick={() => onChange(presetColor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;