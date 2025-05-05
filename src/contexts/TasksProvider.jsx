import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext()

import React from 'react'

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])


  const BASE_URL = 'http://localhost:9000/tasks'

  useEffect(() => {
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
    getTasks()
  }, [])

  async function addTasks(task) {
    if (task.title === '') return
    setTasks([...tasks, task])
    console.log(task);
    // try {
    //     const res = await fetch(BASE_URL)
    //     const data = await res.json()
    //     setTasks(data)
    //     console.log(data);
    // } catch (error) {
    //     throw new Error("Erro fetch tasks")
    // }
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
  function deleteTask (id) {
    setTasks((prev)=> prev.filter((t)=>t.id !== id))
  }


  return (
    <TasksContext.Provider value={{
      tasks,
      addTasks,
      editTask, 
      deleteTask,
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