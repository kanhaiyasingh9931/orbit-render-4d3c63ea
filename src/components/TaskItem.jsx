import React from 'react';
import PropTypes from 'prop-types';

/**
 * TaskItem component – renders a single task with a checkbox to toggle its
 * completion status and a button to delete the task.
 *
 * Props:
 *  - task: { id: string|number, title: string, isComplete: boolean }
 *  - onToggle: (id) => void   // called when the checkbox is clicked
 *  - onDelete: (id) => void   // called when the delete button is pressed
 */
const TaskItem = React.memo(function TaskItem({ task, onToggle, onDelete }) {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li className="task-item flex items-center justify-between p-2 border-b border-gray-200">
      <label className="flex items-center gap-2 cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={handleToggle}
          className="task-item__checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <span
          className={`task-item__title ${
            task.isComplete ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </span>
      </label>

      <button
        type="button"
        onClick={handleDelete}
        className="task-item__delete text-red-600 hover:text-red-800 focus:outline-none"
        aria-label={`Delete ${task.title}`}
      >
        &times;
      </button>
    </li>
  );
});

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;