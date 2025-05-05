import React, { useEffect, useRef, useState } from "react";
import EditTask from "./EditTask";
import TaskForm from "./TaskFrom";
import { useTasks } from "../contexts/TasksProvider";

function Task({ task }) {
  const { title, describtion, category, dateCreated } = task;
  const [isEdit, setIsEdit] = useState(false);
  // const [showForm, setShowForm] = useState(false);
  const { deleteTask } = useTasks();

  useEffect(()=>{
    console.log(isEdit);
  }, [isEdit])

  function handleEdit(e) {
    //prevent other click events in the dom to be executed after this
    console.log("Div Clicked");
      setIsEdit((prev)=>!prev);
  }
  

  function handleDelete() {
    deleteTask(task.id);
  }
  return (
    <div>
      <div onClick={handleEdit} className="task">
        <h3>{title}</h3>
        <p>{describtion}</p>
        <p>{dateCreated}</p>
        <p>{category}</p>
        <button onClick={handleDelete}>Delte</button>
      </div>
      {isEdit && <EditTask task={task} setIsEdit={setIsEdit}></EditTask>}
    </div>
  );
}

export default Task;
