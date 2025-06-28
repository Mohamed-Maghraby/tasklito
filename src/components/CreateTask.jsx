import React, { memo, useCallback, useMemo, useState } from "react";
import DateInput from "./DateInput";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "../store";

const init = {
  id: uuidv4(),
  title: "",
  description: "",
  dateCreated: new Date().toLocaleDateString(),
  category: "",
  dueto: new Date(),
  completed: false,
};

function CreateTask () {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState(init);
  
  function handleInputOnChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }
  const handleDateOnChange = useCallback((date) => {
    setNewTask((prev) => ({ ...prev, dueto: date }));
  }, []);

  function handelSubmit(e) {
    e.preventDefault();
    dispatch({ type: "ADD_TASK", payload: newTask });
    setNewTask({
      ...init,
      id: uuidv4(),
      dateCreated: new Date().toLocaleDateString(),
    });
    dispatch({type: 'SAVE_TASKS'})

  }

  return (
    <form onSubmit={handelSubmit} className="create-from">
      <input
        value={newTask.title}
        className="input-primary"
        name="title"
        onChange={handleInputOnChange}
        placeholder="title"
      />
      <input
        value={newTask.description}
        className="input-primary"
        name="description"
        onChange={handleInputOnChange}
        placeholder="description"
      />
      <input
        value={newTask.category}
        className="input-primary"
        name="category"
        onChange={handleInputOnChange}
        placeholder="category"
      />
      <DateInput
        dueto={newTask.dueto}
        onChange={handleDateOnChange}
        inputClass="input-primary"
      ></DateInput>
      <button type="submit" className="button-primary">
        Done
      </button>
    </form>
  );
};

export default CreateTask;
