import React from 'react';

/**
 * Renders an individual note card.
 * Uses template literals, destructuring, and arrow functions.
 */
const NoteItem = ({ note, onEdit, onDelete }) => {
  const { id, text, date } = note;

  // Calculate local character count for this specific note
  const charCount = text.length;

  return (
    <div className="note-item">
      {/* Note Text with preserved whitespace formatting */}
      <div className="note-content">{text}</div>
      
      {/* Note Footer containing metadata and edit/delete actions */}
      <div className="note-footer">
        <span className="note-date" title={`Last updated: ${date}`}>
          {date} • {charCount} {charCount === 1 ? 'char' : 'chars'}
        </span>
        
        <div className="note-item-actions">
          {/* Edit Button */}
          <button 
            className="btn-note-action" 
            onClick={() => onEdit(id)}
            aria-label="Edit note"
            title="Edit Note"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button 
            className="btn-note-action delete" 
            onClick={() => onDelete(id)}
            aria-label="Delete note"
            title="Delete Note"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
