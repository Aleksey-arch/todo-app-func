import { useState } from 'react';
import classes from './index.module.css'

export function Task({ task, onToggleClick, onDeleted }) {
  const [isActive, setIsActive] = useState(task.active);

  const className = isActive ? classes.active : classes.completed;

  return (
    <li className={classes.li_task}>
      <div className={classes.task}>
        <input className={classes.toggle} type="checkbox" onClick={() => {
          setIsActive(!isActive);
          onToggleClick();
        }} />
        <label className={classes.label_span}>
          <span className={[classes.description, className].join(' ')}>{task.text}</span>
          <span className={classes.created}>created 5 minutes ago</span>
        </label>
        <button className={[classes.icon, classes.icon_edit].join(' ')} />
        <button
          className={[classes.icon, classes.icon_destroy].join(' ')}
          onClick={onDeleted}
        />
      </div>
      <input className={classes.input_edit} />
    </li>
  );
}

