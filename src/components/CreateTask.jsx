import { useCallback, useState } from "react";
import { useTasks } from "../contexts/TasksProvider";
import DateInput from "./DateInput";

const init = {
  id: parseInt(Math.random() * 100000),
  title: "",
  describtion: "",
  dateCreated: new Date().toLocaleDateString(),
  category: "",
  dueto: new Date(),
  completed: false,
};

function CreateTask() {
  const { addTasks } = useTasks();
  const [newTask, setNewTask] = useState(init);

  function handleOnChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }
  const handleDateChange = useCallback((date) => {
    setNewTask((prev) => ({ ...prev, dueto: date }));
  }, []);

  function handeSubmit(e) {
    e.preventDefault();
    addTasks(newTask);
    setNewTask({
      ...init,
      id: parseInt(Math.random() * 100000),
      dateCreated: new Date().toLocaleDateString(),
    });
  }

  return (
    <form onSubmit={handeSubmit} className="create-from">
      <input
        value={newTask.title}
        className="input-primary"
        name="title"
        onChange={handleOnChange}
        placeholder="title"
      />
      <input
        value={newTask.describtion}
        className="input-primary"
        name="describtion"
        onChange={handleOnChange}
        placeholder="describtion"
      />
      <input
        value={newTask.category}
        className="input-primary"
        name="category"
        onChange={handleOnChange}
        placeholder="category"
      />
      <DateInput dueto={newTask.dueto} onChange={handleDateChange} inputClass="input-primary"></DateInput>
      <button type="submit" className="button-primary">Done</button>
    </form>
  );
}

export default CreateTask;
