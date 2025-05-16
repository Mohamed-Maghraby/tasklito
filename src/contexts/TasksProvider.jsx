import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext()

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  const BASE_URL = 'http://localhost:9000/tasks'

  async function getTasks() {
    try {
      const res = await fetch(BASE_URL)
      const data = await res.json()
      setTasks(data)
      console.log(data);
    } catch (error) {
      throw new Error("Erro fetch tasks")
    }
  }

  useEffect(() => {
    const localStorageTasks = localStorage.getItem('Tasks');
    if (localStorageTasks) {
      console.log("Exists");
      try {
        const parsedTasks = JSON.parse(localStorageTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks); // replace, don't append
        }
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
      }
    }
    setLoadedFromStorage(true); // mark loading complete

  }, []);

  useEffect(() => {
    if (loadedFromStorage) {
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
        return task; // don't forget this!
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


  return (
    <TasksContext.Provider value={{
      tasks,
      addTasks,
      editTask,
      deleteTask,
      completedToggle,
    }}>
      {children}
    </TasksContext.Provider>
  )
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    console.error("TaskContext is used outsie TaskProvider")
    return;
  }
  return context;
}

export { TasksProvider, useTasks } 