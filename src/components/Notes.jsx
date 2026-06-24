import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

/**
 * Notes container component providing text area composition, dynamic character counting,
 * search filtering, and the notes layout grid.
 */
const Notes = ({ notes, onAddNote, onUpdateNote, onDeleteNote }) => {
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  const CHARACTER_LIMIT = 600;

  // Load note text into the form when entering edit mode
  const handleStartEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setEditingNoteId(id);
      setInputText(noteToEdit.text);
      
      // Smooth scroll back to form container for better UX
      const formElement = document.querySelector('.note-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Cancel edit mode and clear the input text
  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setInputText('');
  };

  // Handle note submission (creation or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || trimmed.length > CHARACTER_LIMIT) return;

    if (editingNoteId !== null) {
      onUpdateNote(editingNoteId, trimmed);
      setEditingNoteId(null);
    } else {
      onAddNote(trimmed);
    }
    setInputText(''); // Reset textarea
  };

  // Filter notes based on the search query
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // Check character count for warning states
  const charCount = inputText.length;
  const isNearLimit = charCount >= CHARACTER_LIMIT - 60;
  const isAtLimit = charCount >= CHARACTER_LIMIT;

  return (
    <section className="dashboard-section notes-section">
      <div className="section-title">
        {/* SVG Note Icon */}
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <h2>Scribbles & Notes</h2>
      </div>

      <div className="notes-controls">
        {/* Search Bar - Hidden if no notes exist at all */}
        {notes.length > 0 && (
          <div className="search-container">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search notes..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}

        {/* Note Composer Form */}
        <form onSubmit={handleSubmit} className="note-form">
          <textarea
            className="note-textarea"
            placeholder={
              editingNoteId !== null
                ? "Update your note..."
                : "Type a new note here... (Markdown paragraphs supported)"
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={CHARACTER_LIMIT}
            required
          />
          <div className="note-form-footer">
            <span
              className={`char-counter ${isAtLimit ? 'limit' : isNearLimit ? 'warning' : ''}`}
            >
              {charCount} / {CHARACTER_LIMIT} characters
            </span>
            
            <div className="notes-actions">
              {editingNoteId !== null && (
                <button
                  type="button"
                  className="btn-cancel-edit"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn-save-note"
                disabled={isAtLimit && editingNoteId === null && charCount === 0}
              >
                {editingNoteId !== null ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Update Note
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Save Note
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={handleStartEdit}
              onDelete={onDeleteNote}
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
              <path d="M9.62 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-5.62" />
              <path d="M12 18V9" />
              <path d="M9 12l3-3 3 3" />
            </svg>
            <p>
              {notes.length === 0
                ? "No notes saved yet."
                : "No matching notes found."}
            </p>
            <span>
              {notes.length === 0
                ? "Compose your first note in the text box above."
                : "Try adjusting your search query."}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Notes;
