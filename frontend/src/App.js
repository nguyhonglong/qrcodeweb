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

function App() {
  return (
    <div className="App">
      <ContextProivider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<PageHome />} />
          <Route path="/" element={<Login />} />
          {/* PrivateRoute  */}
        
          {/* BabyAdmin */}
          <Route path="/babyadmin" element={<BabyAdmin />} />
          <Route path="/formsearchbill" element={<FormSearchBill />} />
          <Route path="/formaddvoucher" element={<FormAddVoucher />} />
          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/addvoucher" element={<AddVoucher />} />
          <Route path="/searchbilladmin" element={<SearchBillAdmin />} />
        </Routes>
      </ContextProivider>
    </div>
  );
}

export default App;
