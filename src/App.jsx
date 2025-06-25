import Home from "./pages/Home"
import { TasksProvider } from './contexts/TasksProvider'

function App() {
  return (
    <TasksProvider>
      <Home></Home>
    </TasksProvider>
  )
}
export default App
