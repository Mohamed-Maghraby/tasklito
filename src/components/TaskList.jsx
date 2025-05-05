import React, { useEffect, useState } from 'react'
import Task from './Task';
import { useTasks } from '../contexts/TasksProvider';
import EditTask from './EditTask';
function TaskList() {
  const { tasks } = useTasks()
  const [currentTask, setCurrentTask] = useState({})
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    // check if the object is not empty, current state has been updated,we gave a task, render the EditTask
    if (currentTask?.id) {
      setIsVisable(true);
    }
  }, [currentTask]);

  return (
    <div className='tasks'>
      {
        tasks.map((task, index) => {
          return <Task task={task} key={index} setCurrentTask={setCurrentTask} setIsVisable={setIsVisable} currentId={currentTask.id}></Task>
        })
      }
    {isVisable && <EditTask task={currentTask}></EditTask>}
    </div>
  )
}

export default TaskList