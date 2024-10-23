import classes from './index.module.css'

export function TasksFilter() {
  return (
    <ul className={classes.filters}>
      <li>
        <button className={classes.selected}>All</button>
      </li>
      <li>
        <button>Active</button>
      </li>
      <li>
        <button>Completed</button>
      </li>
    </ul>
  );
}

