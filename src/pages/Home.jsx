/*Components*/
import TaskList from '../components/TaskList'
import CreateTask from '../components/CreateTask'
import TasksFilter from '../components/TasksFilter'
import DisplayTasksCounts from '../components/DisplayTasksCounts'

/*context*/
import { TasksProvider } from '../contexts/TasksProvider'
import { TasksFiltersOptionProvider } from '../contexts/TasksFiltersOptionProvider'

function Home() {
  return (
    <div className='home flex flex-col items-center section-margin relative'>
      <div>
        <h1 className='m-0'>Welcome to <span className='text-emerald-500'>Tasklito</span></h1>
        <p className='mt-0 mb-2'>Organize your daily tasks with this amazing react-based to-do app</p>
        <TasksProvider>
          <CreateTask></CreateTask>
          <DisplayTasksCounts></DisplayTasksCounts>
          <TasksFiltersOptionProvider>
            <TasksFilter></TasksFilter>
            <TaskList></TaskList>
          </TasksFiltersOptionProvider>
        </TasksProvider>
      </div> 
    </div>
  )
}

export default Home