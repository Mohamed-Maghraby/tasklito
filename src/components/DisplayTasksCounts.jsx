import useRender from "../hooks/useRender";
import { useTasksContext } from "../contexts/TasksProvider";
import { memo } from "react";

const DisplayTasksCounts = memo(() => {
    const  taskLength = useTasksContext((state)=>state.taskLength);

  useRender("DisplayTasksCounts", "console");
  return (
    <div className="text-xs text-neutral-700 font-semibold">
      You got {taskLength} tasks
    </div>
  );
});
// function DisplayTasksCounts() {
//     const {taskLengthOPT} = useTasksContext()
//     useRender('DisplayTasksCounts', 'console')
//   return (
//     <div className='text-sm text-neutral-700 font-bold'>You got {taskLengthOPT()}</div>
//   )
// }

export default DisplayTasksCounts;
