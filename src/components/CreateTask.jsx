import React, { useCallback, useEffect, useState } from 'react'
import { useTasks } from '../contexts/TasksProvider'
import uniqid from 'uniqid';
import DateInput from './DateInput';
import useRender from '../hooks/useRender';

const init = {
    id: parseInt((Math.random() * 100000)),
    title: "",
    describtion: "",
    dateCreated: new Date().toLocaleDateString(),
    category: "",
    dueto: new Date(),
};

function CreateTask() {
    const [isEdit, setIsEdit] = useState(false)
    const { addTasks } = useTasks()
    const [newTask, setNewTask] = useState(init)
    
    function handleOnChange (e) {
        setNewTask({ ...newTask, [e.target.name]: e.target.value })
    }
    const handleDateChange = useCallback((date) => {
        setNewTask(prev => ({ ...prev, dueto: date}));
      }, []);
      
    function handeSubmit(e) {
        e.preventDefault()
        addTasks(newTask)
        setNewTask({
            ...init,
            id: parseInt((Math.random() * 100000)),
            dateCreated: new Date().toLocaleDateString(),
        })
    }

    return (
        <div>
            {
                isEdit ? (
                <form onSubmit={handeSubmit}>
                    <input value={newTask.title} 
                    name='title'
                    onChange={handleOnChange} 
                    placeholder='Add a task' 
                    />
                    <input value={newTask.describtion} 
                    name='describtion'
                    onChange={handleOnChange} 
                    placeholder='describtion' 
                    />
                    <input value={newTask.category} 
                    name='category'
                    onChange={handleOnChange} 
                    placeholder='category' 
                    />
                    <DateInput 
                    dueto={newTask.dueto} 
                    onChange={handleDateChange} 
                    > 
                    </DateInput>
                    <button type='submit'>Done</button>
                </form>) : ''
            }
            <button onClick={() => setIsEdit((e) => !e)}>ADD A Task</button>
        </div>
    )
}

export default CreateTask