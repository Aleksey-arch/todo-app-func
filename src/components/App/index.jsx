import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { NewTaskForm } from '../NewTaskForm';
import { TaskList } from '../TaskList';
import { Footer } from '../Footer';

import classes from './index.module.css';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [selectedTodoData, setSelectedTodoData] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilters(filter);
  };
  useEffect(() => {
    countTasks();
    handleFilterClick(selectedFilter);
  }, [todoData]);

  const addTask = (inputValue) => {
    if (inputValue.trim().length === 0) {
      alert('Поле не может быть пустым.');
    } else {
      setTodoData([...todoData, createNewTask(inputValue, Date.now())]);
      countTasks(todoData);
    }
  };
  const onDeleted = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    setTodoData([...todoData.slice(0, index), ...todoData.slice(index + 1)]);
  };
  const onDeletedAll = () => {
    const newArr = todoData.filter((item) => item.active !== false);
    setTodoData(newArr);
  };
  const onEdit = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];
    const newItem = { ...oldItem, inputEditCondition: !oldItem.inputEditCondition };
    const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
    setTodoData(newArr);
  };

  const onInputEdit = (inputValue, id) => {
    if (inputValue.trim().length === 0) {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, inputEditCondition: !oldItem.inputEditCondition };
      const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      setTodoData(newArr);

      alert('Поле не может быть пустым.');
    } else {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, inputEditCondition: !oldItem.inputEditCondition, text: inputValue };
      const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      setTodoData(newArr);
    }
  };

  const onFilters = (filter) => {
    if (filter === 'Active') {
      const activeArr = todoData.filter((el) => el.active === true);
      setSelectedTodoData([...activeArr]);
    } else if (filter === 'Complected') {
      const deActiveArr = todoData.filter((el) => el.active === false);
      setSelectedTodoData([...deActiveArr]);
    } else if (filter === 'All') {
      setSelectedTodoData([...todoData]);
    }
  };

  const createNewTask = (text, id) => {
    return {
      text,
      id,
      active: true,
      createdAt: new Date(),
      inputEditCondition: false,
    };
  };

  const formatTimeDifference = (createdAt) => {
    return formatDistanceToNow(createdAt, { addSuffix: true });
  };

  const countTasks = () => {
    setTaskCount(todoData.filter((el) => el.active).length);
  };

  const onToggleClick = (elem) => {
    const index = todoData.findIndex((el) => el.id === elem);
    const oldItem = todoData[index];
    const newItem = { ...oldItem, active: !oldItem.active };
    const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
    setTodoData(newArr);
  };

  return (
    <div className={classes.todo_app}>
      <header className={classes.header}>
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <div className={classes.main}>
        <TaskList
          selectedTodoData={selectedTodoData}
          onToggleClick={onToggleClick}
          onDeleted={onDeleted}
          formatTimeDifference={formatTimeDifference}
          onEdit={onEdit}
          onInputEdit={onInputEdit}
        />
        <Footer
          taskCount={taskCount}
          onDeletedAll={onDeletedAll}
          onFilters={onFilters}
          selectedFilter={selectedFilter}
          handleFilterClick={handleFilterClick}
        />
      </div>
    </div>
  );
}
