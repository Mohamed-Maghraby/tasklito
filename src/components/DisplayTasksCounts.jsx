import React, { memo, useMemo } from 'react'
import useRender from '../hooks/useRender'
import { useTaskLength } from '../contexts/TaskLengthProvider'

const DisplayTasksCounts = memo(()=> {
    const {taskLength} = useTaskLength()
    useRender('DisplayTasksCounts', 'console')
  return (
    <div className='text-sm text-neutral-700 font-bold'>You got {taskLength}</div>
  )
})
// function DisplayTasksCounts() {
//     const {taskLengthOPT} = useTasksValueContext()
//     useRender('DisplayTasksCounts', 'console')
//   return (
//     <div className='text-sm text-neutral-700 font-bold'>You got {taskLengthOPT()}</div>
//   )
// }

export default DisplayTasksCounts