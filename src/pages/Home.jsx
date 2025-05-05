import React from 'react'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskFrom'
import { useTasks } from '../contexts/TasksProvider'
import CreateTask from '../components/CreateTask'
function Home() {
    const {addTasks} = useTasks()
  return (
    <div>
    <TaskList></TaskList>
    {/* <TaskForm onSubmit={addTasks}>Create</TaskForm> */}
    
    <CreateTask></CreateTask>
  </div>

  )
}

export default Home