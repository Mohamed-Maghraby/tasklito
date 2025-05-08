import React, { useEffect, useState, useRef } from 'react'
import { useTasks } from '../contexts/TasksProvider'
import useOutsideClick from '../hooks/useOutsideClick '


function EditTask({ task, setIsVisable }) {
    const [updatedTask, setUpdatedTask] = useState(task)
    const { editTask } = useTasks()
    const editFormRef = useRef()
    useOutsideClick(editFormRef, ()=> setIsVisable(false))

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
        setIsVisable(false)

    }
    function handleClose () {
        setIsVisable(false)
    }

    useEffect(() => {
        console.log("EdidTask is filled with the current task");
        setUpdatedTask(task);
    }, [task]);

    return (
        <form ref={editFormRef} className={'edit-form'} onSubmit={handleSubmit}>
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
            <button type="submit">Done</button>
            <button onClick={handleClose}>Close</button>
        </form>
    )
}

export default EditTask