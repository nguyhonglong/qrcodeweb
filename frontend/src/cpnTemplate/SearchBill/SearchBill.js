import React, { useState, useEffect } from "react";
import "./SearchBill.scss";
import axios from "axios";
import { DatePicker } from "antd";
import TableBill from "../../Admin/Dashboard/TableBill/TableBill";
const { RangePicker } = DatePicker;
function SearchBill() {
  const [dateRange, setDateRange] = useState([]);
  const [billToDate, setBillToDate] = useState([]);
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };
  useEffect(() => {
    const fetchDateData = async () => {
      try {
        const response = await axios.get(
          `https://github.com/nguyhonglong/qrcodeweb/api/records?startDate=${dateRange[0]?.format(
            "YYYY-MM-DD"
          )}&endDate=${dateRange[1]?.format("YYYY-MM-DD")}`
        );
        setBillToDate(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchDateData();
  }, [dateRange]);
  return (
    <>
      <div style={{ backgroundColor: "#181B22", height: "110vh" }}>
        <div className="SearchBill">
          <p
            className="textCenter"
            style={{ fontSize: "28px", color: "#f8f8f8" }}
          >
            Tra cứu hóa đơn
          </p>

          <RangePicker
            style={{ margin: "0px 0 0 50px", border: "2px solid #000" }}
            onChange={handleDateChange}
          />
        </div>
        <div>{billToDate ? <TableBill billToDate={billToDate} /> : ""}</div>
      </div>
    </>
  );
}

export default SearchBill;
