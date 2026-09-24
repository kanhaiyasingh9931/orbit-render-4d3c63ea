import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

/**
 * TaskList component – renders a collection of TaskItem components.
 *
 * Props:
 *  - tasks: Array<{ id: string|number, title: string, isComplete: boolean }>
 *  - onToggle: (id) => void   // called when a task's checkbox is toggled
 *  - onDelete: (id) => void   // called when a task's delete button is pressed
 */
const TaskList = React.memo(function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 py-4">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="task-list divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ),
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasks: [],
};

export default TaskList;