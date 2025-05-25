import React, { createContext, useContext, useState } from 'react'

const TasksFiltersOptionContext = createContext()


function TasksFiltersOptionProvider({children}) {
    const [tasksFilterOption, setTasksFilterOption] = useState('')
     
    function filterTasks (option) {
        setTasksFilterOption(option)
    }
    
  return (
    <TasksFiltersOptionContext.Provider value={{tasksFilterOption, filterTasks}}>
        {children}
    </TasksFiltersOptionContext.Provider>

  )
}

function useTasksFiltersOptionContext() {
  const context = useContext(TasksFiltersOptionContext)
  if (context === undefined) {
    console.error("TaskContext is used outside TaskProvider")
    return;
  }
  return context;
}
export {TasksFiltersOptionProvider, useTasksFiltersOptionContext}