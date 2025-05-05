
import { TasksProvider } from "./contexts/TasksProvider"
import Home from "./pages/Home"

function App() {
  return (
    <TasksProvider>
        <Home></Home>
    </TasksProvider>
  )
}

export default App
