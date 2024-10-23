import classes from './index.module.css'
import { NewTaskForm } from '../NewTaskForm'
import { TaskList } from '../TaskList'
import { Footer } from '../Footer'
import { useEffect, useState } from 'react'

export default function App() {

  const [todoData, setTodoData] = useState([])
  const [taskCount, setTaskCount] = useState(0)

  useEffect(() => {
    countTasks()
  }, [todoData])

  const addTask = (inputValue) => {
    setTodoData([...todoData, createNewTask(inputValue, Date.now())])
    countTasks(todoData)
  }
  const onDeleted = (id) => {
    const index = todoData.findIndex(el => el.id === id)
    setTodoData([...todoData.slice(0, index), ...todoData.slice(index + 1)])
    
  }

  const createNewTask = (text, id) => {
    return {
      text,
      id,
      active: true
    }
  }

  const countTasks = () => {
    setTaskCount(todoData.filter(el => el.active).length);
  }

  const onToggleClick = (elem) => {
    const index = todoData.findIndex(el => el.id === elem)
    const oldItem = todoData[index];
    const newItem = { ...oldItem, active: !oldItem.active };
    const newArr = [
      ...todoData.slice(0, index),
      newItem,
      ...todoData.slice(index + 1),
    ];
    setTodoData(newArr)
    
  }

  return (
    <div className={classes.todo_app}>
      <header className={classes.header}>
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <div className={classes.main}>
        <TaskList
          todoData={todoData}
          onToggleClick={onToggleClick}
          onDeleted={onDeleted}
        />
        <Footer taskCount={taskCount} />
      </div>
    </div>
  );
}


