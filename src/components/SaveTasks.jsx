import { useDispatch } from '../store'

function SaveTasks() {
    const dispatch = useDispatch()
    function handleSave() {
      dispatch({type: 'LOADING_START'})
      dispatch({type: 'SAVE_TASKS'})
    }
  return (
    <button onClick={handleSave} className='button-primary'>Save Tasks</button>
  )
}

export default SaveTasks