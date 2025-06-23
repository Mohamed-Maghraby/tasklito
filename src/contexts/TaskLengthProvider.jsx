import { createContext, useContext, useMemo } from "react";

const TaskLengthContext = createContext();

export function TaskLengthProvider({ children, taskLength }) {
  const value = useMemo(() => taskLength, [taskLength]);
  return (
    <TaskLengthContext.Provider value={value}>
      {children}
    </TaskLengthContext.Provider>
  );
}

export function useTaskLength() {
  return useContext(TaskLengthContext);
}
