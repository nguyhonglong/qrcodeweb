import { Route, Routes } from "react-router-dom";
import Register from "../components/Authentication/Register/Register";
import Login from "../components/Authentication/Login/Login";
import PageHome from "../components/PageHome/PageHome";
import BabyAdmin from "../BabyAdmin/BabyAdmin";
import FormSearchBill from "../BabyAdmin/cpnBabyAdmin/FormSearchBill/FormSearchBill";
import FormAddVoucher from "../BabyAdmin/cpnBabyAdmin/FormAddVoucher/FormAddVoucher";
import Dashboard from "../Admin/Dashboard/Dashboard";
import AddVoucher from "../Admin/Dashboard/AddVoucher/AddVoucher";
import SearchBillAdmin from "../Admin/Dashboard/SearchBill/SearchBill";
import DrinkComponent from "../BabyAdmin/cpnBabyAdmin/MenuComponent/MenuComponent";
import PrivateRoute from "./PrivateRoute";
import AddStore from "../Admin/Dashboard/AddStore/AddStore";
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Login />} />
        {/* PrivateRoute  */}

        {/* BabyAdmin */}
        <Route
          path="/babyadmin"
          element={
            <PrivateRoute>
              <BabyAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/formsearchbill"
          element={
            <PrivateRoute>
              <FormSearchBill />
            </PrivateRoute>
          }
        />
        <Route
          path="/formaddvoucher"
          element={
            <PrivateRoute>
              <FormAddVoucher />
            </PrivateRoute>
          }
        />
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addvoucher"
          element={
            <PrivateRoute>
              <AddVoucher />
            </PrivateRoute>
          }
        />
        <Route
          path="/searchbilladmin"
          element={
            <PrivateRoute>
              <SearchBillAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <DrinkComponent />
            </PrivateRoute>
          }
        />
         <Route
          path="/addstore"
          element={
            <PrivateRoute>
              <AddStore />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <PageHome />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
