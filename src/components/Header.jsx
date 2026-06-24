import React from 'react';

/**
 * Premium dashboard header displaying the application brand and real-time statistics.
 * Uses destructured props to render task and note statistics dynamically.
 */
const Header = ({ totalTasks, completedTasks, totalNotes }) => {
  // Calculate completion percentage safely to avoid division by zero
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo-icon">✓</div>
        <h1>To-do</h1>
      </div>
      
      <div className="header-stats">
        <div className="stat-chip">
          <span>Tasks</span>
          <span className="stat-val">
            {completedTasks}/{totalTasks} ({completionPercentage}%)
          </span>
        </div>
        
        <div className="stat-chip">
          <span>Notes</span>
          <span className="stat-val notes">
            {totalNotes}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
