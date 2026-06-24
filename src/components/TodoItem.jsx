import React from 'react';

/**
 * Renders an individual task card with dynamic styling based on completion status.
 * Demonstrates props, object destructuring, and arrow functions in event handling.
 */
const TodoItem = ({ task, onToggle, onDelete }) => {
  const { id, text, completed } = task;

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="todo-item-left">
        {/* Custom interactive checkbox */}
        <div 
          className={`custom-checkbox ${completed ? 'checked' : ''}`} 
          onClick={() => onToggle(id)}
          role="checkbox"
          aria-checked={completed}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              onToggle(id);
            }
          }}
        >
          {/* Animated checkmark icon */}
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1.5 5 4.5 8 10.5 1.5" />
          </svg>
        </div>
        
        {/* Task description */}
        <span className="todo-text">{text}</span>
      </div>

      {/* Delete task button */}
      <button 
        className="btn-action-delete" 
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        title="Delete Task"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
