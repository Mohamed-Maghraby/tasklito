import Home from "./pages/Home";
import { Provider } from "./store";

function App() {
  return (
    <Provider>
      <Home></Home>
    </Provider>
  );
}
export default App;
