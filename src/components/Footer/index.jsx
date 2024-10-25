import { TasksFilter } from '../TasksFilter';

import classes from './index.module.css';

export function Footer({ taskCount, onFilters, selectedFilter, handleFilterClick, onDeletedAll }) {
  return (
    <footer className={classes.footer}>
      <span className={classes.todo_count}>{taskCount} items left</span>
      <TasksFilter onFilters={onFilters} selectedFilter={selectedFilter} handleFilterClick={handleFilterClick} />
      <button className={classes.clear_completed} type="button" onClick={onDeletedAll}>
        Clear completed
      </button>
    </footer>
  );
}
