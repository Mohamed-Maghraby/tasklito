/**
 * Current problem with context: when state changes here all components that consume the context re-render
 * Ex: createTask component consume the context to access addTask, when state updates in re-renders
 * unnecessary, it should only re-renders when its local state changes or create a new task,
 * but when filter options changes it re-renders.
 * Consider more states unrelated to tasks updated happen here it will cause waste renders.  
 * 
 * Updates: Created a separate context and provider for filter options, components that does not use the options
 * provider won't get re-render. 
 * unnecessary re-renders for components like DisplayTasksCounts and createTasks, when fn like toggle or edit
 * gets executed, that's because the provider gets re-render and all consumers do so.
 * Even when provider got separated to values, and api that didn't solve the issue.
 * 
 * Goal: when any fn gets executed like toggle or edit, subscribed components that don't get effected should be optimized 
 * Result: can't be optimized with native technique

 * 
 * conclusion: After analyzing the nature of the app I was able to conclude that the problem lies in two main things
 * 
 * 1-tasks which are objects inside an array that gets changed frequently (high-velocity-data) any component consumes the "tasks" array will 
 * get re-rendered when this array changes. That can be okay for small components that doesn't cause huge performance issue. For the 
 * taskList component itself it can be a performance issue if the list that gets rendered is huge, and can be optimized using libraries
 * like (react-window, react-virtualized, TanStack Virtual) to render-on-scroll (virtualizing technique) 
 * 
 * 2-Component does not consume tasks directly they either consume context api (tasks functionality like add, edit, delete, etc..)
 * or value derived from tasks array itself (length of array).
 * To understand this we should look on how context-api look and some JS behaviors, remember we pass the value of the state to the
 * context provider as an object ( <ContextName.Provider value={{state}}>), objects in JS are references i.e (when create and object it will 
 * reference a memory address) review (primitive vs Reference Types) in JS, with this behavior in JS when component re-renders,
 * a new object reference is created.
 * 
 * In our case the <ContextName.Provider value={{state}}> the value is an object when "tasks array" changes a new "value" object 
 * reference is created and passed as prop to the provider causing the consumers component to re-render not because the state 
 * changes but be cause we get a new object, that explains why components that only reads api fns like CreateTask component 
 * (only read addTask method) gets re-rendered even if we split the context to values and api or memoized fns with 
 * use memo and useCallback the "value" object itself will be a new instance every time context re-renders value={{thisTinyObject}}
 * 
 * This issue can be overcome by moving api fns outside the context, using lib like use-context-selector or (redux/zustand ).
 * 
 * Considering the second issue in which components that uses derived values like "tasks.length" will face the same issue, 
 * as its gets computed from "tasks array" so it will get re-rendered when "tasks array changes 
 * 
 * Finally: Context can be used to mange global state that doesn't change often (dark, them config, ect..), or when
 * your states inside the context are not bound together i.e an object of states like a form inputs values
 * changing name won't affect country so in such an example you can improve context consumers with little 
 * tricks so they not re-render unnecessarily 
 * 
 */
import { useCallback,useEffect,useMemo,useState } from "react";
import { createContext, useContextSelector } from "use-context-selector"; 
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

  function addTasks (task) {
    if (!task.title) return;
    setTasks((prev) => [...prev, task]); //use updater function to avoid stale state
    console.log(task);
  }
  // const addTasks = useCallback ((task) => {
  //   if (!task.title) return;
  //   setTasks((prev) => [...prev, task]); //use updater function to avoid stale state
  //   console.log(task);
  // },[tasks])  

  function editTask  (updatedTask) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    console.log(updatedTask);
  }

  function deleteTask (id)  {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  
  function completedToggle (task)  {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    }

  const tasksValue = useMemo(() => {
    return { addTasks, deleteTask, editTask, completedToggle };
  },[addTasks, deleteTask, editTask, completedToggle]);

  const taskLength = tasks.length;
  return (
    <TasksContext.Provider value={{ tasks, taskLength, ...tasksValue }}>
        {children}
    </TasksContext.Provider>
  );
}

function useTasksContext(selector) {
  const context = useContextSelector(TasksContext, selector);
  if (context === undefined) {
    console.error("TaskContext is used outside TaskProvider");
    return;
  }
  return context;
}

export { TasksProvider, useTasksContext };
