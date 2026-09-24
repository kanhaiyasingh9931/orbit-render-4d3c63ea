import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskInput.css';

/**
 * TaskInput – a controlled input component that lets the user add a new task.
 *
 * Props
 * -----
 * onAddTask: (title: string) => void
 *   Callback invoked with the task title when the user submits the form.
 *
 * The component clears its internal input after a successful submission and
 * ignores empty submissions.
 */
export default function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      onAddTask(trimmed);
      setTitle('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit} aria-label="Add new task">
      <input
        type="text"
        className="task-input__field"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
      />
      <button type="submit" className="task-input__button" disabled={!title.trim()}>
        Add
      </button>
    </form>
  );
}

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};