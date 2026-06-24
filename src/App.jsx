import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Todo from './components/Todo';
import Notes from './components/Notes';
import ConfirmModal from './components/ConfirmModal';
import './styles/App.css';

/**
 * Main Application Dashboard.
 * Coordinates global state, localStorage sync, and the global confirmation modal.
 * Uses advanced array methods, destructuring, let/const, and arrow functions.
 */
const App = () => {
  // --- STATE INITIALIZATION ---
  
  // Default values for a premium first-time experience
  const defaultTasks = [
    { id: 't1', text: 'Structure modular React components in a dashboard layout', completed: true },
    { id: 't2', text: 'Implement smooth custom CSS checkmark and card scale animations', completed: false },
    { id: 't3', text: 'Configure custom dark theme with Outfit font and glowing accents', completed: false },
  ];

  const defaultNotes = [
    {
      id: 'n1',
      text: 'Welcome to your workspace! 🚀\n\nOrganize daily checklists on the left and write notes on the right. Your modifications are saved automatically to your browser\'s LocalStorage. Happy writing!',
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    },
  ];

  // Lazy state initialization from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('taskflow_notes');
    return savedNotes ? JSON.parse(savedNotes) : defaultNotes;
  });

  // Global Confirmation Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // --- PERSISTENCE EFFECT ---
  
  // Keep localStorage in sync with tasks state
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Keep localStorage in sync with notes state
  useEffect(() => {
    localStorage.setItem('taskflow_notes', JSON.stringify(notes));
  }, [notes]);

  // --- TO-DO HANDLERS ---

  // Add a new task (inserted at the top of the list)
  const handleAddTask = (text) => {
    const newTask = {
      id: `task_${Date.now()}`,
      text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Toggle completion status of a task
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Trigger modal confirmation to delete a task
  const handleDeleteTaskTrigger = (id) => {
    const targetTask = tasks.find((t) => t.id === id);
    if (!targetTask) return;

    setModalState({
      isOpen: true,
      title: 'Delete Task',
      message: `Are you sure you want to delete "${
        targetTask.text.length > 30 ? targetTask.text.slice(0, 30) + '...' : targetTask.text
      }"? This action cannot be undone.`,
      onConfirm: () => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        closeModal();
      },
    });
  };

  // --- NOTES HANDLERS ---

  // Helper to format the current date and time beautifully
  const getFormattedDate = () => {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Save a new note
  const handleAddNote = (text) => {
    const newNote = {
      id: `note_${Date.now()}`,
      text,
      date: getFormattedDate(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // Update an existing note
  const handleUpdateNote = (id, text) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text, date: getFormattedDate() } : note
      )
    );
  };

  // Trigger modal confirmation to delete a note
  const handleDeleteNoteTrigger = (id) => {
    const targetNote = notes.find((n) => n.id === id);
    if (!targetNote) return;

    setModalState({
      isOpen: true,
      title: 'Delete Note',
      message: `Are you sure you want to delete this note? This action cannot be undone.`,
      onConfirm: () => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        closeModal();
      },
    });
  };

  // Close the global modal
  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // --- DERIVED STATS FOR HEADER ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalNotes = notes.length;

  return (
    <div className="app-container">
      {/* Dynamic Header Component */}
      <Header
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        totalNotes={totalNotes}
      />

      {/* Main Dashboard Panel */}
      <main className="dashboard-grid">
        {/* Task Management Panel */}
        <Todo
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTaskTrigger}
        />

        {/* Notes Management Panel */}
        <Notes
          notes={notes}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNoteTrigger}
        />
      </main>

      {/* Global Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
        onCancel={closeModal}
      />
    </div>
  );
};

export default App;
