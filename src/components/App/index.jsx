import { useEffect, useRef, useState } from 'react';
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

  const [conditionTimer, setConditionTimer] = useState(false);

  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const intervalRef = useRef(null);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilters(filter);
  };
  useEffect(() => {
    countTasks();
    handleFilterClick(selectedFilter);
  }, [todoData]);

  const addTask = (inputValue, allSeconds) => {
    if (allSeconds === 0) {
      allSeconds = 900;
    }

    if (inputValue.trim().length === 0) {
      alert('Поле не может быть пустым.');
    } else {
      setTodoData([...todoData, createNewTask(inputValue, Date.now(), allSeconds)]);
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

  const createNewTask = (text, id, allSeconds) => {
    return {
      text,
      id,
      active: true,
      createdAt: new Date(),
      inputEditCondition: false,
      allSeconds,
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

  const startTimer = (allSeconds) => {
    setSecondsRemaining(allSeconds);
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setConditionTimer(false);
          clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  };

  const toChangeConditionTimerPlay = (elem) => {
    setConditionTimer(true);
    const index = todoData.findIndex((el) => el.id === elem);
    const timerTask = todoData[index];
    setSelectedTask(timerTask);
    setSecondsRemaining(timerTask.allSeconds);
  };
  useEffect(() => {
    if (conditionTimer) {
      startTimer(secondsRemaining);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [conditionTimer]);
  useEffect(() => {
    if (conditionTimer) {
      const idSelectTask = selectedTask.id;

      const index = todoData.findIndex((el) => el.id === idSelectTask);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, allSeconds: secondsRemaining };
      const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      setTodoData(newArr);
    }
  }, [secondsRemaining]);

  const toChangeConditionTimerPause = () => {
    setConditionTimer(false);
  };

  return (
    <div className={classes.todo_app}>
      <header>
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
          toChangeConditionTimerPlay={toChangeConditionTimerPlay}
          toChangeConditionTimerPause={toChangeConditionTimerPause}
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
