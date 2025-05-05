import React, { useEffect, useRef, useState } from "react";
import EditTask from "./EditTask";
import TaskForm from "./TaskFrom";
import { useTasks } from "../contexts/TasksProvider";

function Task({ task, setCurrentTask, setIsVisable}) {
  const { title, describtion, category, dateCreated, id } = task;
  const { deleteTask } = useTasks();

  function handleEdit(e) {
    // setIsVisable(true)
    setCurrentTask(task)
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
    <button onClick={handleDelete}>Delte</button>
  </div>
);
}

export default Task;
