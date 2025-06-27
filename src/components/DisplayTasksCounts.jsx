import { memo } from "react";
import { useTrackedState } from "../store";

const DisplayTasksCounts = memo(() => {
  const state = useTrackedState();
  const taskLength = state.tasks.length;

  return (
    !state.pending && (
      <span className="text-xs text-neutral-700 font-semibold">
        You got {taskLength} tasks
      </span>
    )
  );
});

export default DisplayTasksCounts;
