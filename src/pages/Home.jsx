import React from 'react'
import TaskList from '../components/TaskList'
import { TasksProvider, useTasks } from '../contexts/TasksProvider'
import CreateTask from '../components/CreateTask'
function Home() {
  return (
    <div className='home flex flex-col items-center section-margin relative'>
      <div>
        <h1 className='m-0'>Welcome to <span className='text-emerald-500'>Tasklito</span></h1>
        <p className='mt-0 mb-6'>Organize your daily tasks with this amazing react-based to-do app</p>
        <TasksProvider>
          <CreateTask></CreateTask>
          <TaskList></TaskList>
        </TasksProvider>
      </div>
    </div>
  )
}

export default Home