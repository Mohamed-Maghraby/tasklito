import { useEffect, useState } from "react";
import Task from "./Task";
import { useTasksContext } from "../contexts/TasksProvider";
import { useTasksFiltersOptionContext } from "../contexts/TasksFiltersOptionProvider";
function TaskList() {
  const { tasks } = useTasksContext();
  const { tasksFilterOption } = useTasksFiltersOptionContext();

  useEffect(() => {
    console.log("task render")
    console.log(tasks);;
  });

  return (
    <div className="tasks h-110 overflow-y-auto bg-white rounded-md my-1">
      {/* {
        tasks.map((task, index) => {
          return <Task task={task} key={index}></Task>
        })
      }  */}

      {tasksFilterOption === "all" &&
        tasks
          .filter((t) => {
            return t;
          })
          .map((t) => {
            return <Task task={t} key={t.id}></Task>;
          })}
      {tasksFilterOption === "completed" &&
        tasks
          .filter((t) => {
            return t.completed;
          })
          .map((t) => {
            return <Task task={t} key={t.id}></Task>;
          })}
      {tasksFilterOption === "non_completed" &&
        tasks
          .filter((t) => {
            return !t.completed;
          })
          .map((t) => {
            return <Task task={t} key={t.id}></Task>;
          })}
    </div>
  );
}

export default TaskList;
