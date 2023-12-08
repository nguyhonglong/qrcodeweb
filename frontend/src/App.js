import "./App.css";
// import { Routes, Route } from "react-router-dom";
import { ContextProivider } from "./Context/userContext";
import AppRoutes from "./AppRoutes/AppRoutes";

function App() {
  return (
    <div className="App">
      <ContextProivider>
        <AppRoutes />
      </ContextProivider>
    </div>
  );
}

export default App;
