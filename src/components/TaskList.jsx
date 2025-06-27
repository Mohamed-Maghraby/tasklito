import { useEffect } from "react";
import Task from "./Task";
import { useTrackedState } from "../store";

function TaskList() {
  const state = useTrackedState();
  const tasks = state.tasks;
  const filterOption = state.filterOption

  useEffect(() => {
    console.log(tasks);
  });

  return (
    <div className="tasks h-110 overflow-y-auto bg-white rounded-md my-1">
      {filterOption === "all" &&
        tasks
          .filter((t) => {
            return t;
          })
          .map((t) => {
            return <Task task={t} key={t.id}></Task>;
          })}
      {filterOption === "completed" &&
        tasks
          .filter((t) => {
            return t.completed;
          })
          .map((t) => {
            return <Task task={t} key={t.id}></Task>;
          })}
      {filterOption === "non_completed" &&
        tasks
          .filter((t) => {
            return !t.completed;
          })
          .map((t) => {
            return <Task task={t} key={t.id}></Task>;
          })}
      {state.pending && <p>Loading...</p>}
    </div>
  );
}

export default TaskList;
