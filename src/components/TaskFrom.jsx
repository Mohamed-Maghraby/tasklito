/**
 * This component intended to be an abstraction layer for both EditTask and CreateTask since they share similar functionality and behavior
 */


import uniqid from 'uniqid';

function TaskForm({ initialTask, onSubmit, type, children }) {
    
    const isEditingMode = !!initialTask; //casts to boolean
    const [isEdit, setIsEdit] = useState(!isEditingMode); // if there is task object? edit mode :create mode
    const [task, setTask] = useState({
        id: initialTask?.id || uniqid(),
        title: initialTask?.title || '',
        description: initialTask?.description || '',
        dateCreated: initialTask?.dateCreated || Date.now(),
        category: initialTask?.category || '',
    });

    function handleChange(e) {
        //e.target is an object can be destructured, dynamically update state based on input name att
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(task);
        // If creating, clear the form after submit
        if (!isEditing) {
            setTask({
                id: uniqid(),
                title: '',
                description: '',
                dateCreated:Date.now(),
                category: '',
            });
        }
        setIsEdit(false); // exit edit mode
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            {isEdit && (
                <div>
                    <input
                        className={isEditingMode? `bold`: ''}
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                    <input
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                    <input
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        placeholder="Category"
                    />
                </div>
            )}
            <button type="button" onClick={() => setIsEdit((prev) => !prev)}>
                {children}
            </button>
            {isEdit && <button type="submit">Done</button>}
        </form>
    );
}
export default TaskForm;
