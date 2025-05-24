import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TasksContext = createContext()

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [tasksFilterOption, setTasksFilterOption] = useState('')
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  const BASE_URL = 'http://localhost:9000/tasks'

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


  function addTasks(task) {
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

  function filterTasks (option) {
    setTasksFilterOption(option)
  }

  return (
    <TasksContext.Provider value={{
      tasks,
      tasksFilterOption,
      addTasks,
      editTask,
      deleteTask,
      completedToggle,
      filterTasks,
    }}>
      {children}
    </TasksContext.Provider>
  )
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    console.error("TaskContext is used outside TaskProvider")
    return;
  }
  return context;
}

export { TasksProvider, useTasks } 