import React, { useState } from 'react';
import TodoItem from './TodoItem';

/**
 * To-Do section component containing the task input form, filter tabs, and the list of tasks.
 * Uses local state for the filter and input field, and lifts task state to App.jsx.
 */
const Todo = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Form submission handler using arrow function
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    
    onAddTask(trimmed);
    setInputText(''); // Clear input field
  };

  // Filter tasks based on current filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <section className="dashboard-section todo-section">
      <div className="section-title">
        {/* SVG Todo Icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h2>Task Checklist</h2>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="todo-input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new assignment..."
            className="todo-input"
            maxLength={120}
            required
          />
        </div>
        <button type="submit" className="btn-add-todo" aria-label="Add Task">
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add
        </button>
      </form>

      {/* Filter Tabs */}
      {tasks.length > 0 && (
        <div className="todo-filters">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      )}

      {/* Task List or Empty State */}
      <div className="todo-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="empty-state">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>
              {tasks.length === 0
                ? "No tasks created yet."
                : filter === 'active'
                ? "No active tasks remaining!"
                : "No completed tasks yet."}
            </p>
            <span>
              {tasks.length === 0
                ? "Type a task above and press Add."
                : filter === 'active'
                ? "Great job getting everything done!"
                : "Mark a task as complete to see it here."}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Todo;
