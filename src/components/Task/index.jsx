import { useState } from 'react';

import classes from './index.module.css';

export function Task({ task, onToggleClick, onDeleted, formatTimeDifference, onEdit, onInputEdit }) {
  const [isActive, setIsActive] = useState(task.active);
  const [inputValue, setInputValue] = useState('');
  const [isClickEditChangeToggle, setIsClickEditChangeToggle] = useState(true);

  const classNameClickEditChangeToggle = isClickEditChangeToggle
    ? classes.isClickEditChangeToggleActive
    : classes.isClickEditChangeToggleInactive;

  const classNameInputEdit = task.inputEditCondition ? classes.input_edit_active : classes.input_edit_inactive;
  const className = isActive ? classes.active : classes.completed;

  const onInputEditChange = (e) => {
    setInputValue(e.target.value);
  };

  const onInputEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      onInputEdit(inputValue, task.id);
      setInputValue('');
      setIsClickEditChangeToggle(!isClickEditChangeToggle);
    }
  };

  return (
    <li className={classes.li_task}>
      <div className={classes.task}>
        <input
          className={[classes.toggle, classNameClickEditChangeToggle].join(' ')}
          type="checkbox"
          onClick={() => {
            setIsActive(!isActive);
            onToggleClick();
          }}
        />
        <label className={classes.label_span}>
          <span className={[classes.description, className].join(' ')}>{task.text}</span>
          <span className={classes.created}>created {formatTimeDifference(task.createdAt)}</span>
        </label>
        <button
          className={[classes.icon, classes.icon_edit].join(' ')}
          onClick={() => {
            setIsClickEditChangeToggle(!isClickEditChangeToggle);
            onEdit();
          }}
        />
        <button className={[classes.icon, classes.icon_destroy].join(' ')} onClick={onDeleted} />
      </div>
      <input
        className={[classes.input_edit, classNameInputEdit].join(' ')}
        placeholder={task.text}
        autoFocus
        onChange={onInputEditChange}
        value={inputValue}
        onKeyDown={onInputEditKeyDown}
      />
    </li>
  );
}
