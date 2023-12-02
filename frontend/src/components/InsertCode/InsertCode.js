import React, { useState } from "react";
import "./InsertCode.scss";
// import InvoiceBill from "../Share/InvoiceBill/InvoiceBill";
import { message } from "antd";
import axios from "axios";
import TableBill from "../../Admin/Dashboard/TableBill/TableBill";

function InsertCode() {
  const [successMess, setSuccessMess] = message.useMessage();
  const [valueSearchCode, setValueSearchCode] = useState("");
  const [billData, setBillData] = useState([]);
  let myArray = JSON.parse(localStorage.getItem("myArrayData")) || [];
  const handleSearchCode = async () => {
    if (valueSearchCode !== "") {
      try {
        const response = await axios.get(
          `https://github.com/nguyhonglong/qrcodeweb/api/bills/${valueSearchCode}`
        );
        setBillData(response.data);
        myArray.push(response.data);
        localStorage.setItem("myArrayData", JSON.stringify(myArray));
        const retrievedArrayJSON = localStorage.getItem("myArrayData");

        if (retrievedArrayJSON) {
          const retrievedArray = JSON.parse(retrievedArrayJSON);
          setBillData(retrievedArray.reverse());
        } else {
          console.log("Không có mảng được lưu");
        }
        // message
        successMess.open({
          type: "success",
          content: "Tra cứu hóa đơn thành công",
        });
        setValueSearchCode("");
      } catch (error) {
        console.error("Error fetching drinks:", error);
        successMess.open({
          type: "error",
          content: "Tra cứu hóa đơn thất bại, hãy xem lại mã đã nhập",
        });
      }
    } else {
      successMess.open({
        type: "error",
        content: "Nhập lại mã",
      });
    }
  };
  const handleClearData = () => {
    // Xóa mảng khỏi localStorage
    localStorage.removeItem("myArrayData");

    // Xóa mảng trong state
    setBillData([]);

    // Hiển thị thông báo
    successMess.open({
      type: "success",
      content: "Xóa hóa đơn thành công",
    });
  };

  return (
    <>
      {setSuccessMess}
      <div id="InsertCode">
        <div className="form_container">
          <div className="title_container">
            <p className="title">Tra cứu</p>
            <span className="subtitle">Nhập mã voucher tại đây</span>
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="email_field">
              Code
            </label>
            <input
              placeholder="TXTXXXXXX"
              title="Email"
              name="input-name"
              type="text"
              className="input_field"
              id="email_field"
              value={valueSearchCode}
              onChange={(e) => setValueSearchCode(e.target.value)}
            />
          </div>
          <div style={{display:'flex', alignItems:'center'}}>
            <button className="sign-in_btn" onClick={handleSearchCode}>
              <span>Tra cứu</span>
            </button>
            <button className="clear-in_btn" onClick={handleClearData}>
              <span>Xóa</span>
            </button>
          </div>
        </div>
        {<TableBill billToDate={billData} />}
      </div>
    </>
  );
}

export default InsertCode;
