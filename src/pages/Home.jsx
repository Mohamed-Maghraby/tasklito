/*Components*/
import TaskList from "../components/TaskList";
import CreateTask from "../components/CreateTask";
import TasksFilter from "../components/TasksFilter";
import DisplayTasksCounts from "../components/DisplayTasksCounts";
import SaveTasks from "../components/SaveTasks";

/*hooks*/
import { useEffect } from "react";
import { useDispatch } from "../store";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOADING_START" });
    const localStorageTasks = localStorage.getItem("Tasks");
    if (localStorageTasks) {
      try {
        const parsedTasks = JSON.parse(localStorageTasks);
        //check the type of the tasks (must be array)
        if (Array.isArray(parsedTasks)) {
          console.log("local get");
          dispatch({ type: "LOADING_SUCCESS", payload: parsedTasks });
        }
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
        dispatch({ type: "LOADING_FAILED" });
      }
    }
  }, []);

  return (
    <div className="home flex flex-col items-center section-margin relative">
      <div>
        <h1 className="m-0">
          Welcome to <span className="text-emerald-500">Tasklito</span>
        </h1>
        <p className="mt-0 mb-2">
          Organize your daily tasks with this amazing react-based to-do app
        </p>
        <SaveTasks />
        <CreateTask></CreateTask>
        <DisplayTasksCounts></DisplayTasksCounts>
        <TasksFilter></TasksFilter>
        <TaskList></TaskList>
      </div>
    </div>
  );
}

export default Home;
