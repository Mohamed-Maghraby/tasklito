import { useEffect, useReducer, useState } from 'react'
import Task from './Task';
import { useTasks } from '../contexts/TasksProvider';
import EditTask from './EditTask';
function TaskList() {
  
  const { tasks } = useTasks()
  const [currentTask, setCurrentTask] = useState({})
  const [isVisable, setIsVisable] = useState(false);
  
  useEffect(() => {
    console.log("currentTask Updated");
  }, [currentTask]);

  useEffect(() => {
    console.log("task render");
  });

  return (
    <div className='tasks h-110 overflow-y-auto bg-white  rounded-md my-6'>
      {
        tasks.map((task, index) => {
          return <Task task={task} key={index} setCurrentTask={setCurrentTask} setIsVisable={setIsVisable} currentTaskId={currentTask.id}></Task>
        })
      }
    {isVisable && <EditTask task={currentTask} setIsVisable={setIsVisable}></EditTask>}
    </div>
  )
}

export default TaskList