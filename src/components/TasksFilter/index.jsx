import classes from './index.module.css';

export function TasksFilter({ selectedFilter, handleFilterClick }) {
  return (
    <ul className={classes.filters}>
      <li>
        <button
          className={[selectedFilter === 'All' ? classes.selected : ''].join(' ')}
          onClick={() => handleFilterClick('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={[selectedFilter === 'Active' ? classes.selected : ''].join(' ')}
          onClick={() => handleFilterClick('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={[selectedFilter === 'Complected' ? classes.selected : ''].join(' ')}
          onClick={() => handleFilterClick('Complected')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
