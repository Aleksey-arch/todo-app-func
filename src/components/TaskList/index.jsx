import { Task } from '../Task';

export function TaskList({ selectedTodoData, onToggleClick, onDeleted, formatTimeDifference }) {
  return (
    <div>
      {selectedTodoData.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleClick={() => onToggleClick(task.id)}
          onDeleted={() => onDeleted(task.id)}
          formatTimeDifference={formatTimeDifference}
        />
      ))}
    </div>
  );
}
