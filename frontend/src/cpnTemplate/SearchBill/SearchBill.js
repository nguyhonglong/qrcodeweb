import React, { useState, useEffect } from "react";
import "./SearchBill.scss";
import axios from "axios";
import { DatePicker,Button } from "antd";
import TableBill from "../../Admin/Dashboard/TableBill/TableBill";
import { CSVLink } from "react-csv";
import { FileExcelOutlined } from "@ant-design/icons";
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
          `https://qrcodeweb-api.vercel.app/api/records?startDate=${dateRange[0]?.format(
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
      <div id="SearchBill">
        <div className="SearchBill">
          <p
            className="textCenter MyTikTok2"
            style={{ fontSize: "28px", color: "#f8f8f8" }}
          >
            Tra cứu hóa đơn
          </p>

          <RangePicker
            style={{ width: "80%", height: "50px", margin: "20px auto" }}
            onChange={handleDateChange}
          />
        </div>
        <div className="table_search_date">
          <div>{<TableBill billToDate={billToDate} dateRange={dateRange} />}</div>
        </div>
      </div>
    </>
  );
}

export default SearchBill;
