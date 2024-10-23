
import { Task } from '../Task'

export function TaskList({ todoData, onToggleClick, onDeleted }) {

  return (
    <div >
      {todoData.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleClick={() => onToggleClick(task.id)}
          onDeleted={() => onDeleted(task.id)}
        />
      ))}
    </div>
  );
}
