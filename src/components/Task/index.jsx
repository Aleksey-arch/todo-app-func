import { useEffect, useRef, useState } from 'react';

import classes from './index.module.css';

export function Task({
  task,
  onToggleClick,
  onDeleted,
  formatTimeDifference,
  onEdit,
  onInputEdit,
  toChangeConditionTimerPlay,
  toChangeConditionTimerPause,
}) {
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
    if (e.key === 'Enter' || e.keyCode === 27) {
      onInputEdit(inputValue, task.id);
      setInputValue('');
      setIsClickEditChangeToggle(!isClickEditChangeToggle);
    }
  };

  const formatTime = (seconds) => {
    if (isActive && seconds === 0) setIsActive(!isActive);

    if (seconds === 0) {
      return 'Время вышло!';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <li className={classes.li_task}>
      <div className={classes.task}>
        <input
          className={[classes.toggle, classNameClickEditChangeToggle].join(' ')}
          type="checkbox"
          onChange={onToggleClick}
          checked={!isActive}
          onClick={() => {
            setIsActive(!isActive);
            onToggleClick();
          }}
        />
        <div className={classes.label_span}>
          <span className={[classes.description, className].join(' ')}>{task.text}</span>
          <div className={classes.container_btn_timer}>
            <button className={classes.btn_timer_play} type={'button'} onClick={toChangeConditionTimerPlay}></button>
            <button className={classes.btn_timer_pause} type={'button'} onClick={toChangeConditionTimerPause}></button>
            <div className={classes.all_time}>{formatTime(task.allSeconds)}</div>
          </div>
          <span className={classes.created}>created {formatTimeDifference(task.createdAt)}</span>
        </div>

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
