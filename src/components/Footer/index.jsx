import classes from './index.module.css'
import { TasksFilter } from '../TasksFilter'

export function Footer(props) {
  return (
    <footer className={classes.footer}>
      <span className={classes.todo_count}>{props.taskCount} items left</span>
      <TasksFilter />
      <button className={classes.clear_completed} type="button">
        Clear completed
      </button>
    </footer>
  );
}


