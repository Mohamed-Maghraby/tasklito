import React from 'react'
import { useTasksValueContext } from '../contexts/TasksProvider'
import useRender from '../hooks/useRender'

function DisplayTasksCounts() {
    const {tasksLength} = useTasksValueContext()
    useRender('DisplayTasksCounts', 'console')
  return (
    <div className='text-sm text-neutral-700 font-bold'>You got {tasksLength}</div>
  )
}

export default DisplayTasksCounts