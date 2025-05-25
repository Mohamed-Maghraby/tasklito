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
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const TasksAPIContext = createContext()
const TasksValueContext = createContext()

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const tasksLength = tasks.length 


  useEffect(() => {
    /*
      Check if the tasks exists or not.
      If some interruption happens on mounting useEffect may not be able to retrieve tasks.
      Tasks may be replaced with the init value -> {} when we try to set the tasks in the effect below.
      If the below effect runs before this which may happen data will be lost.
     */
    const localStorageTasks = localStorage.getItem('Tasks');
    if (localStorageTasks) {
      try {
        const parsedTasks = JSON.parse(localStorageTasks);
        //check the type of the tasks (must be array)
        if (Array.isArray(parsedTasks)) {
          console.log("local get");
          setTasks(parsedTasks); // replace, don't append
        }
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
      }
    }
    setLoadedFromStorage(true); // mark loading complete

  }, []);

  //Warning: this effect will render whenever tasks changes, might be a performance issue
  useEffect(() => {
    if (loadedFromStorage) {
      console.log("Local Set");
      localStorage.setItem('Tasks', JSON.stringify(tasks));
    }
  }, [tasks, loadedFromStorage]);


  const tasksApi = useMemo(() => {

    function addTasks (task) {
      if (!task.title) return;
      setTasks((prev) => [...prev, task]); //use updater function to avoid stale state
      console.log(task);
    }

    function editTask(updatedTask) {
      setTasks(
        tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return { ...task, ...updatedTask }; // spread to update fields
          }
          return task; // always return 
        })
      );
      console.log(updatedTask);
    }

    function deleteTask(id) {
      setTasks((prev) => prev.filter((t) => t.id !== id))
    }

    function completedToggle(task) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );

    }

    return { addTasks, editTask, deleteTask, completedToggle }

  }, [tasks])

  
  return (
    <TasksAPIContext.Provider value={{tasksApi}}>
      <TasksValueContext.Provider value={{tasks, tasksLength}}>
        {children}
      </TasksValueContext.Provider>
    </TasksAPIContext.Provider>
  )
}

function useTasksAPIContext() {
  const context = useContext(TasksAPIContext)
  if (context === undefined) {
    console.error("TaskContext is used outside TaskProvider")
    return;
  }
  return context;
}
function useTasksValueContext() {
  const context = useContext(TasksValueContext)
  if (context === undefined) {
    console.error("TaskContext is used outside TaskProvider")
    return;
  }
  return context;
}


export { TasksProvider, useTasksAPIContext, useTasksValueContext } 