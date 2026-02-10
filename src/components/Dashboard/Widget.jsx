// components/Dashboard/Widget.jsx
import React from 'react';

const Widget = ({ title, children, type }) => {
  return (
    <div className={`widget widget-${type}`}>
      <div className="widget-header">
        <h3>{title}</h3>
        <div className="widget-actions">
          <button className="btn-icon">⋮</button>
        </div>
      </div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default Widget;