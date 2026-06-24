# To-do & Scribbles Dashboard

A modern, responsive, and premium React.js dashboard that combines a **Task Checklist (To-Do)** and a **Scribble Pad (Notes)** into a single, cohesive workspace. Designed with a dark glassmorphic aesthetic, this application provides an interactive and efficient user experience for managing daily tasks and jottings.

---

## ✨ Key Features

### 📋 Task Checklist (To-Do)
*   **Create & Track**: Quickly add new tasks with a sleek, responsive input field.
*   **Interactive Toggles**: Check off completed items with custom-animated SVG checkboxes and smooth strikethrough transitions.
*   **Smart Filtering**: Filter tasks in real-time by status (**All**, **Active**, and **Completed**).
*   **Dynamic Stats**: Visual progress tracker in the header showing the exact count and percentage of completed tasks.
*   **Elegant Empty States**: Informative, beautiful illustrations when no tasks are present in the selected filter.

### 📝 Scribble Pad (Notes)
*   **Unified Composer**: Type new notes or edit existing ones in a single, smart composition field that changes modes dynamically.
*   **Real-Time Search**: Search through saved notes instantly with a case-insensitive keyword filter.
*   **Character Limits**: Safeguard note lengths with a dynamic live character counter that alerts you (amber/red) as you near the limit.
*   **Rich Metadata**: Every note card displays the precise creation or last-modified date and time, along with the character count.

### ⚙️ Platform Enhancements
*   **Automatic Persistence**: All data is kept in sync with the browser's `LocalStorage`, preserving your tasks and notes across page refreshes.
*   **Bespoke Deletions**: Custom glassmorphic confirmation modals protect against accidental deletions, replacing standard browser alerts.
*   **Responsive Grid**: A responsive layout that positions panels side-by-side on desktop displays and stacks them vertically on mobile and tablet viewports.

---

## 🛠️ Technology Stack

*   **Frontend Library**: React.js (Functional Components, Hooks)
*   **Build Tool**: Vite (Fast HMR, optimized production builds)
*   **Styling**: Modern Vanilla CSS (Custom properties, HSL color system, keyframe animations, glassmorphic filters)
*   **Icons**: Handcrafted lightweight SVG iconography
*   **Version Control**: Git & GitHub

---

## 📂 Modular Project Structure

```text
src/
├── components/
│   ├── Header.jsx       # Branding header with live task & note statistics
│   ├── Todo.jsx         # Task form, filter tabs, and listing panel
│   ├── TodoItem.jsx     # Individual task items with animated checkboxes
│   ├── Notes.jsx        # Search bar, note text area, and note grid
│   ├── NoteItem.jsx     # Note cards displaying content and actions
│   └── ConfirmModal.jsx # Elegant custom deletion confirmation dialogs
├── styles/
│   └── App.css          # Design tokens, global reset, layouts, and animations
├── App.jsx              # Core orchestrator and state controller
└── main.jsx             # React entry point
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16.0.0 or higher) installed on your system.

### Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/theskyxdev/internship-minor-project-4.git
    cd internship-minor-project-4
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Launch the Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173/](http://localhost:5173/) in your web browser to run the application.

4.  **Compile for Production**:
    ```bash
    npm run build
    ```
    This builds the optimized production assets inside the `dist/` directory.

---

## 🎨 Design System & Aesthetics

*   **Theme**: Deep futuristic dark mode (`#08090c`) with vibrant indigo and violet gradients.
*   **Glassmorphism**: Card panels utilize `backdrop-filter: blur(16px)` with subtle translucent borders (`rgba(255, 255, 255, 0.06)`) for a premium layered depth.
*   **Typography**: The high-end, modern sans-serif font **Outfit** is imported from Google Fonts for enhanced readability and aesthetics.
