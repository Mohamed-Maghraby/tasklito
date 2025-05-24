/**
 * In this version we do not need to use React.memo to prevent Task from rendering when isVisible change.
 * isVisible state is moved from parent to child, and rendering EditTask conditionally, now we saved
 * huge time and performance we do not have a stat the holds the current task and we do not pass setters to 
 * children, some time creating a component with local state and using conditional rendering is the best solution
 */

import React, { useEffect, useState } from "react";
import { useTasks } from "../contexts/TasksProvider";
import { Trash } from "lucide-react";
import EditTask from "./EditTask";

function Task({ task }) {
  const { title, category, dueto, completed } = task;
  const { deleteTask, completedToggle } = useTasks();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dateObject = new Date(dueto);
  const formatted = dateObject
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace("at", ","); // Remove comma after date

  useEffect(() => {
    console.log("tasks render");
  });

  function handleEdit(e) {
    e.stopPropagation();
    setIsVisible(true);
  }

  function handleDelete() {
    setIsVisible(false);
    deleteTask(task.id);
  }

  function handleCompletedToggle() {
    completedToggle(task);
  }
  return (
    <div className="flex flex-col items-start min-w-100 border-1 px-5 py-2 my-4 border-black rounded-md">
      <div className="flex items-center justify-between h-auto w-full ">
        <div className="flex items-start gap-2 ">
          <input
            className="w-4 h-4"
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCompletedToggle(task)}
          />
          <div onClick={handleEdit} className="cursor-pointer">
            <h3
              className={`${completed ? "line-through decoration-emerald-600" : ""} text-sm font-medium m-0 `}>
              {title}
            </h3>
            <p className="text-xs text-green-600 m-0">{formatted}</p>
          </div>
        </div>
        {category && <div className="category" title="category">{category}</div>}
        <Trash
          className="ml-12 cursor-pointer"
          onClick={handleDelete}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          size={20}
          strokeWidth={1.5}
          stroke={`${isHovered ? 'red' : 'black'}`}
        />
      </div>
      {isVisible && <EditTask task={task} setIsVisible={setIsVisible}></EditTask>}
    </div>
  );
}

export default Task;