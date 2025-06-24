/**
 * Current problem with context: when state changes here all components that consume the context re-render
 * Ex: createTask component consume the context to access addTask, when state updates in re-renders
 * unnecessary, it should only re-renders when its local state changes or create a new task,
 * but when filter options changes it re-renders.
 * Consider more state unrelated to tasks updated happen here it will cause waste renders.
 *
 * Updates:
 * Created a separate context and provider for filter options, components that does nopt use the options
 * provider won't get re-render.
 * unnecessary re-renders for components like DisplayTasksCounts and createTasks, when fn like toggle or edit
 * gets executed, that's because the provider gets re-render and all consumers do so.
 * Even when provider got separated to values, and api that didn't solve the issue.
 *
 * Goal:
 * when any fn gets executed like toggle or edit, subscribed components that don't get effected should
 * be optimized
 *
 *
 * the problem is when tasks changes from anywhere inside the context, it will a new object instance will
 * passed to provider {tasks, taskLength} {tasksApi}, causing the whole consumers to re-render, regardless
 * of consumers being memoized or you use callbacks or not, a new reference is created
 *
 * Final:
 * No improvement can be done, as long as the values you use depend on tasks which is an array gets changed
 * every time you make an action in the api, the consumers that depend pr even read the tasks will re-render
 * that happens because we try to implement a context for high-velocity-data i.e data changes frequently
 * on every action, so the best solution here is to use something like context selector or zustand or any
 * state management library that gets around that.
 *
 * Context can be used to mange global state that doesn't change often (dark, them config, ect..), or when
 * your states inside the context are not bound together i.e an object of states like a form inputs values
 * changing name won't affect country so in such an example you can improve context consumers with little
 * tricks so they not re-render unnecessarily
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TaskLengthProvider } from "./TaskLengthProvider";
const TasksContext = createContext();

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  useEffect(() => {
    /*
      Check if the tasks exists or not.
      If some interruption happens on mounting useEffect may not be able to retrieve tasks.
      Tasks may be replaced with the init value -> {} when we try to set the tasks in the effect below.
      If the below effect runs before this which may happen data will be lost.
     */
    const localStorageTasks = localStorage.getItem("Tasks");
    if (localStorageTasks) {
      try {
        const parsedTasks = JSON.parse(localStorageTasks);
        //check the type of the tasks (must be array)
        if (Array.isArray(parsedTasks)) {
          console.log("local get");
          setTasks(parsedTasks); // replace, don't append
        }
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
    setLoadedFromStorage(true); // mark loading complete
  }, []);

  //Warning: this effect will render whenever tasks changes, might be a performance issue
  useEffect(() => {
    if (loadedFromStorage) {
      console.log("Local Set");
      localStorage.setItem("Tasks", JSON.stringify(tasks));
    }
  }, [tasks, loadedFromStorage]);

  const addTasks = useCallback((task) => {
    if (!task.title) return;
    setTasks((prev) => [...prev, task]); //use updater function to avoid stale state
    console.log(task);
  }, []);

  const editTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    console.log(updatedTask);
  }, []);

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [tasks]
  );

  const completedToggle = useCallback(
    (task) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    },
    [tasks]
  );

  // const tasksValue = useMemo(() => {
  //   return { addTasks, deleteTask, editTask, completedToggle };
  // },[addTasks, deleteTask, editTask, completedToggle]);

  const taskLength = tasks.length;
  return (
    <TasksContext.Provider value={{ tasks, addTasks, deleteTask, editTask, completedToggle }}>
      <TaskLengthProvider taskLength={{ taskLength }}>
        {children}
      </TaskLengthProvider>
    </TasksContext.Provider>
  );
}

function useTasksContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    console.error("TaskContext is used outside TaskProvider");
    return;
  }
  return context;
}

export { TasksProvider, useTasksContext };
