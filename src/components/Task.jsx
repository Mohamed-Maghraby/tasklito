import React, {useEffect } from "react";
import { useTasks } from "../contexts/TasksProvider";

function Task({ task, setCurrentTask, setIsVisable}) {
  const { title, describtion, category, dateCreated, dueto } = task;
  const { deleteTask } = useTasks();
  const dateObject = new Date(dueto)

  function handleEdit(e) {
    e.stopPropagation()
    setCurrentTask(task)
    setIsVisable(true)
  }

function handleDelete() {
  deleteTask(task.id);
}
return (
  <div onClick={handleEdit} className="task">
    <h3>{title}</h3>
    <p>{describtion}</p>
    <p>{dateCreated}</p>
    <p>{category}</p>
    <p>{dateObject.toLocaleDateString()}</p>
    <button onClick={handleDelete}>Delte</button>
  </div>
);
}

export default Task;
