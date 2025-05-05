import React, { useEffect, useState, useRef } from 'react'
import { useTasks } from '../contexts/TasksProvider'


function EditTask({ task, setIsEdit }) {
    const [updatedTask, setUpdatedTask] = useState(task)
    const { editTask } = useTasks()
    const editFormRef = useRef()

    //Just changes input vlaue onChange
    function handleChange(e) {
        //e.target is an object can be destructuered, dynamically update state based on input name att
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    }

    //Handles When user submit
    function handleSubmit(e) {
        e.preventDefault()
        editTask(updatedTask)
    }

    useEffect(() => {
        setUpdatedTask(task);
    }, [task]);

    return (
        <form ref={editFormRef} className={'edit-form'} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <input
                name="title"
                value={updatedTask.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <input
                name="describtion"
                value={updatedTask.describtion}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                name="category"
                value={updatedTask.category}
                onChange={handleChange}
                placeholder="Category"
            />
            <button type="submit">Edit</button>
        </form>
    )
}

export default EditTask