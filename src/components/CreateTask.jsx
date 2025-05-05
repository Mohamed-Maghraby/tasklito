import React, { useEffect, useState } from 'react'
import { useTasks } from '../contexts/TasksProvider'

const init = {
  id: parseInt((Math.random()*10)),
  title: "",
  describtion: "",
  dateCreated: Date.now(),
  category: "",
};

function CreateTask() {
    const [isEdit, setIsEdit] = useState(false)
    const {addTasks} = useTasks()
    const [newTask, setNewTask] = useState(init) 

     function handleEdit() {
        addTasks(newTask)
    }

    return (
        <div>
            {
                isEdit ? (<div>
                    <input value={newTask.title} onChange={(e) => setNewTask({...newTask, title:e.target.value})} />
                    <input value={newTask.describtion} onChange={(e) => setNewTask({...newTask, describtion:e.target.value})} />
                </div>) : ''
            }
            <button onClick={() => setIsEdit((e) => !e)}>ADD A Task</button>
            <button onClick={handleEdit}>Done</button>
        </div>
    )

}

export default CreateTask