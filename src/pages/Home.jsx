import React from 'react'
import TaskList from '../components/TaskList'
import { TasksProvider, useTasks } from '../contexts/TasksProvider'
import CreateTask from '../components/CreateTask'
function Home() {
  return (
    <div>
      <TasksProvider>
        <TaskList></TaskList>    
        <CreateTask></CreateTask>
      </TasksProvider>
  </div>
  )
}

export default Home