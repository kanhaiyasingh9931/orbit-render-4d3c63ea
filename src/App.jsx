import React, { useState, useCallback, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskCounter from './components/TaskCounter';
import './index.css';

/**
 * Root component for the task manager application.
 *
 * Manages the list of tasks, persists them to localStorage, and provides handlers
 * for adding, toggling completion, and deleting tasks. It also calculates the
 * total and completed task counts for display.
 */
export default function App() {
  // State: array of task objects { id, title, isComplete }
  const [tasks, setTasks] = useState([]);

  const STORAGE_KEY = 'task-manager-tasks';

  // Helper to generate a reasonably unique id for each task.
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Load tasks from localStorage on first render
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const migrated = parsed.map((t) => {
            // Ensure each task has required fields; generate missing id.
            const id = t.id ?? generateId();
            const title = typeof t.title === 'string' ? t.title : '';
            const isComplete = Boolean(t.isComplete);
            return { id, title, isComplete };
          }).filter((t) => t.title.trim() !== '');
          setTasks(migrated);
        }
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
      }
    }
  }, []);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Add a new task with the given title.
   * @param {string} title
   */
  const handleAddTask = useCallback((title) => {
    const newTask = {
      id: generateId(),
      title,
      isComplete: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  /**
   * Toggle the completion state of a task.
   * @param {string|number} id
   */
  const handleToggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }, []);

  /**
   * Delete a task from the list.
   * @param {string|number} id
   */
  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.isComplete).length;

  return (
    <div className="app-container max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
      <TaskCounter total={total} completed={completed} />
    </div>
  );
}
