import React, { memo } from "react";
import "./BabyAdmin.scss";
import NavBar from "../components/NavBar/NavBar";
import FormBabyAdmin from "../cpnTemplate/formBbAdmin/FormBabyAdmin";
import SearchBill from "../cpnTemplate/SearchBill/SearchBill";
import FormAddVoucher from "./cpnBabyAdmin/FormAddVoucher/FormAddVoucher";
// import DrinkForm from "./cpnBabyAdmin/ChooseDrink/ChooseDrink";
function BabyAdmin() {
  return (
    <div id="babyadmin">
      <FormAddVoucher />
    </div>
  );
}

export default memo(BabyAdmin);
