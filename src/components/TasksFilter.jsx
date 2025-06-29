import { useEffect, useState } from 'react'
import { useDispatch } from '../store';

function TasksFilter() {
    const dispatch = useDispatch()

    const [option, setOption] = useState('all')
    useEffect(()=>{
        dispatch({type: 'FILTER_TASKS', payload: option})
    }, [option])
  return (
    <div className='my-2 flex flex-col items-start'>
        <label className='text-sm text-neutral-500' htmlFor="filter">Filter Tasks...</label>
        <select className=' px-2 py-1 rounded-sm outline-emerald-500 text-neutral-500' value={option} name='filter' onChange={(e)=>setOption(e.target.value)}> 
            <option value="all">All</option>
            <option value="completed">completed</option>
            <option value="non_completed">Non-completed</option>
        </select>
    </div>
  )
}

export default TasksFilter