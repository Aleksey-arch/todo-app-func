import classes from './index.module.css'
import { TasksFilter } from '../TasksFilter'

export function Footer(props) {
  return (
    <footer className={classes.footer}>
      <span className={classes.todo_count}>{props.taskCount} items left</span>
      <TasksFilter
        onFilters={props.onFilters}
        selectedFilter={props.selectedFilter}
        handleFilterClick={props.handleFilterClick}
      />
      <button
        className={classes.clear_completed}
        type='button'
        onClick={props.onDeletedAll}
      >Clear completed</button>
    </footer>
  );
}


