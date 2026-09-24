import React from 'react';
import PropTypes from 'prop-types';
import './TaskCounter.css';

/**
 * TaskCounter component
 *
 * Displays the total number of tasks and how many of them are completed.
 *
 * @param {Object} props
 * @param {number} props.total      - Total number of tasks.
 * @param {number} props.completed  - Number of completed tasks.
 */
function TaskCounter({ total, completed }) {
  return (
    <div className="task-counter">
      <p className="task-counter__text">
        {completed} of {total} task{total !== 1 ? 's' : ''} completed
      </p>
    </div>
  );
}

TaskCounter.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
};

export default TaskCounter;