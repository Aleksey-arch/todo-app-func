import { Task } from '../Task';

export function TaskList({ selectedTodoData, onToggleClick, onDeleted, formatTimeDifference, onEdit, onInputEdit }) {
  return (
    <div>
      {selectedTodoData.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleClick={() => onToggleClick(task.id)}
          onDeleted={() => onDeleted(task.id)}
          formatTimeDifference={formatTimeDifference}
          onEdit={() => onEdit(task.id)}
          onInputEdit={onInputEdit}
        />
      ))}
    </div>
  );
}
