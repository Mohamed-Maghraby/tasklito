import React from 'react'
import Task from './Task';
import { useTasks } from '../contexts/TasksProvider';
function TaskList() {
  const { tasks } = useTasks()
  return (
    <div className='tasks'>
      {
        tasks.map((task, index) => {
          return <Task task={task} key={index}></Task>
        })
      }
    </div>
  )
}

export default TaskList