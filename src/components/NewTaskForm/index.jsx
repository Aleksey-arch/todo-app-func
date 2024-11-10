import { useState } from 'react';

import classes from './index.module.css';

export function NewTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');
  const [inputValueMin, setInputValueMin] = useState('');
  const [inputValueSec, setInputValueSec] = useState('');

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue, Number(inputValueMin) * 60 + Number(inputValueSec));
    setInputValue('');
    setInputValueMin('');
    setInputValueSec('');
  };

  function onInputChangeTimeMin(e) {
    setInputValueMin(e.target.value);
  }

  function onInputChangeTimeSec(e) {
    setInputValueSec(e.target.value);
  }

  return (
    <form className={classes.new_task_form} onSubmit={onSubmit}>
      <input
        className={classes.new_todo}
        placeholder="What needs to be done?"
        autoFocus
        onChange={onInputChange}
        value={inputValue}
      />
      <input
        type="number"
        className={[classes.new_todo, classes.new_todo_timer_min].join(' ')}
        placeholder="Min"
        autoFocus
        onChange={onInputChangeTimeMin}
        value={inputValueMin}
      />
      <input
        type="number"
        className={[classes.new_todo, classes.new_todo_timer_sec].join(' ')}
        placeholder="Sec"
        autoFocus
        onChange={onInputChangeTimeSec}
        value={inputValueSec}
      />
      <button type={'submit'} style={{ display: 'none' }}></button>
    </form>
  );
}
