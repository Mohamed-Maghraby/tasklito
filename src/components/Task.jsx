import { useEffect, useState } from "react";
import { useTasks } from "../contexts/TasksProvider";
import { Trash } from "lucide-react";

function Task({ task, setCurrentTask, setIsVisable }) {
  const { title, describtion, category, dateCreated, dueto, completed } = task;
  const { deleteTask, completedToggle } = useTasks();
  const [isHovered, setIsHovered] = useState(false);

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
    setCurrentTask(task);
    setIsVisable(true);
  }

  function handleDelete() {
    setIsVisable(false);
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
          onMouseEnter={()=>setIsHovered(true)}
          onMouseLeave={()=>setIsHovered(false)}
          size={20}
          strokeWidth={1.5}
          stroke={`${isHovered ? 'red' : 'black'}`}
        />
      </div>
    </div>
  );
}

export default Task;
