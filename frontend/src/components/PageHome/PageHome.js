import React from "react";
import './PageHome.scss'
import NavBar from "../NavBar/NavBar";
// import InvoiceBill from "../Share/InvoiceBill/InvoiceBill";
import InsertCode from "../InsertCode/InsertCode";
function PageHome() {
  return (
    <div id="PageHome">
      <NavBar />
      <div
        style={{
         height:'120vh',
        }}
      >
        <InsertCode />
      </div>
    </div>
  );
}

export default PageHome;
