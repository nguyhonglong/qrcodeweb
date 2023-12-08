import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContextProivider } from "./Context/userContext";
import PageHome from "./components/PageHome/PageHome";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import Dashboard from "./Admin/Dashboard/Dashboard";
import BabyAdmin from "./BabyAdmin/BabyAdmin";
import AddVoucher from "./Admin/Dashboard/AddVoucher/AddVoucher";
import FormSearchBill from "./BabyAdmin/cpnBabyAdmin/FormSearchBill/FormSearchBill";
import FormAddVoucher from "./BabyAdmin/cpnBabyAdmin/FormAddVoucher/FormAddVoucher";
import SearchBillAdmin from "./Admin/Dashboard/SearchBill/SearchBill";
import MenuComponent from "./BabyAdmin/cpnBabyAdmin/MenuComponent/MenuComponent";
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
