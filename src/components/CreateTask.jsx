import { useCallback, useEffect, useState } from "react";
import { useTasks } from "../contexts/TasksProvider";
import DateInput from "./DateInput";
import { v4 as uuidv4 } from 'uuid';
import useRender from '../hooks/useRender'

const init = {
  id: uuidv4(),
  title: "",
  description: "",
  dateCreated: new Date().toLocaleDateString(),
  category: "",
  dueto: new Date(),
  completed: false,
};

function CreateTask() {

  const { addTasks } = useTasks();
  const [newTask, setNewTask] = useState(init);

  useRender('create task', 'console')

  function handleInputOnChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }
  const handleDateOnChange = useCallback((date) => {
    setNewTask((prev) => ({ ...prev, dueto: date }));
  }, []);

  function handelSubmit(e) {
    e.preventDefault();
    addTasks(newTask);
    setNewTask({
      ...init,
      id: uuidv4(),
      dateCreated: new Date().toLocaleDateString(),
    });
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
      <DateInput dueto={newTask.dueto} onChange={handleDateOnChange} inputClass="input-primary"></DateInput>
      <button type="submit" className="button-primary">Done</button>
    </form>
  );
}

export default CreateTask;
