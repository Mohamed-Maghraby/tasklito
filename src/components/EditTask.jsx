import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTasks } from "../contexts/TasksProvider";
import useOutsideClick from "../hooks/useOutsideClick ";
import DateInput from "./DateInput";
import { X } from "lucide-react";

function EditTask({ task, setIsVisable }) {
    const [updatedTask, setUpdatedTask] = useState(task);
    const [isHovered, setIsHovered] = useState(false);
    const { editTask } = useTasks();
    const editFormRef = useRef();
    useOutsideClick(editFormRef, () => setIsVisable(false));

    //Just changes input vlaue onChange
    function handleChange(e) {
        //e.target is an object can be destructuered, dynamically update state based on input name att
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    }
    const handleDateChange = useCallback((date) => {
        setUpdatedTask((prev) => ({ ...prev, dueto: date }));
    }, []);

    //Handles When user submit
    function handleSubmit(e) {
        e.preventDefault();
        editTask(updatedTask);
        setIsVisable(false);
    }
    function handleClose() {
        setIsVisable(false);
    }

    useEffect(() => {
        console.log("EdidTask is filled with the current task");
        setUpdatedTask(task);
    }, [task]);

    return (
        <div className="absolute h-full w-full bg-white/30 backdrop-blur-[2px] top-0 left-0">
            <form ref={editFormRef} className="edit-form" onSubmit={handleSubmit}>
                <div className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-white"></div>
                <X
                    className="absolute -top-2.5 -right-2.5 cursor-pointer"
                    size={22}
                    strokeWidth={3}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    stroke={`${isHovered ? 'red' : 'black'}`}
                    onClick={handleClose}
                />
                <label className="text-sm text-neutral-700" htmlFor="title">title</label>
                <input
                    className="input-primary w-full"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <label className="text-sm text-neutral-700" htmlFor="describtion">describtion</label>
                <textarea
                    className="input-primary min-w-full max-w-full" 
                    name="describtion"
                    value={updatedTask.describtion}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <label className="text-sm text-neutral-700" htmlFor="category">category</label>
                <input
                    className="input-primary w-full"
                    name="category"
                    value={updatedTask.category}
                    onChange={handleChange}
                    placeholder="Category"
                />
                 <label className="text-sm text-neutral-700" htmlFor="DatePicker">due to</label>
                <DateInput
                    dueto={updatedTask.dueto}
                    onChange={handleDateChange}
                    setIsVisable={setIsVisable}
                    inputClass={"input-primary w-full"}
                ></DateInput>

                <button type="submit" className="button-primary w-full">
                    Done
                </button>
            </form>
        </div>
    );
}

export default EditTask;
