import { useState } from 'react';

import classes from './index.module.css';

export function NewTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue('');
  };

  return (
    <form className={classes.new_task_form} onSubmit={onSubmit}>
      <input
        className={classes.new_todo}
        placeholder="What needs to be done?"
        autoFocus
        onChange={onInputChange}
        value={inputValue}
      />
    </form>
  );
}
