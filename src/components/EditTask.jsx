import React, { useEffect, useState, useRef, forwardRef } from 'react'
import { useTasks } from '../contexts/TasksProvider'


function  EditTask ({task, setIsEdit}){
    const [updatedTask, setUpdatedTask]= useState(task)
    const {editTask} = useTasks()
    const TaskRef = useRef()
    
      useEffect(() => {
        console.log(TaskRef.current);
        const handleDocumentClick = (event) => {
            if (TaskRef.current && !TaskRef.current.contains(event.target)) {
              console.log(event.composedPath());
              setIsEdit(false);
    
          }

        };
    
        document.addEventListener("click", handleDocumentClick);
    
        // Cleanup
        return () => {
          document.removeEventListener("click", handleDocumentClick);
        };
      }, []);
    

    // useEffect(() => {
    //     if (updatedTask) {
    //         editTask(updatedTask);
    //     }
    // }, [updatedTask]); // narrow dependency to ID if that’s your trigger

    function handleChange(e) {
        //e.target is an object can be destructuered, dynamically update state based on input name att
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit (e) {
        e.preventDefault()
        editTask(updatedTask)
    }
  
  return (
    <form ref={TaskRef} className={'edit-form'} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}
>
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