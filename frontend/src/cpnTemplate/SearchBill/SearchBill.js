// import React, { useState, useEffect } from "react";
// import "./SearchBill.scss";
// import axios from "axios";
// import { DatePicker } from "antd";
// import TableBill from "../../Admin/Dashboard/TableBill/TableBill";
// const { RangePicker } = DatePicker;
// function SearchBill() {
//   const [dateRange, setDateRange] = useState([]);
//   const [billToDate, setBillToDate] = useState([]);
//   const handleDateChange = (dates) => {
//     setDateRange(dates);
//   };
//   useEffect(() => {
//     const fetchDateData = async () => {
//       try {
//         const response = await axios.get(
//           `https://qrcodeweb-api.vercel.app/api/records?startDate=${dateRange[0]?.format(
//             "YYYY-MM-DD"
//           )}&endDate=${dateRange[1]?.format("YYYY-MM-DD")}`
//         );
//         console.log(response.data)
//         setBillToDate(response.data);
//       } catch (error) {
//         console.error("Error fetching drinks:", error);
//       }
//     };
//     fetchDateData();
//   }, [dateRange]);

//   return (
//     <>
//       <div id="SearchBill">
//         <div className="SearchBill">
//           <p
//             className="textCenter MyTikTok2"
//             style={{ fontSize: "28px", color: "#f8f8f8" }}
//           >
//             Tra cứu hóa đơn
//           </p>

//           <RangePicker
//             style={{ width: "80%", height: "50px", margin: "20px auto" }}
//             onChange={handleDateChange}
//           />
//         </div>
//         <div className="table_search_date">
//           <div>
//             {billToDate ? (
//               <TableBill billToDate={billToDate} />
//             ) : (
//               <TableBill billToDate={"Chưa có dữ liệu"} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SearchBill;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InvoiceTable = ({ drinks }) => {
  const [drinkPrices, setDrinkPrices] = useState({});
  const [invoiceData, setInvoiceData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchDrinkPrices();
  }, []);

  const fetchDrinkPrices = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/drinks');
      const drinks = response.data;
      const prices = {};

      for (const drink of drinks) {
        prices[drink.name] = drink.price;
      }

      setDrinkPrices(prices);
    } catch (error) {
      console.error('Error fetching drink prices:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

      const response = await axios.get('http://localhost:5555/api/bills', {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        }
      });

      const invoices = response.data;
      setInvoiceData(invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const calculateTotalValue = (drinks) => {
    let total = 0;
    for (const drink of drinks) {
      const price = drinkPrices[drink.drink];
      total += drink.quantity * price;
    }
    return total;
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFetchInvoices = () => {
    fetchInvoices();
  };

  return (
    <div>
      <div>
        <label htmlFor="startDate">Ngày bắt đầu:</label>
        <DatePicker id="startDate" selected={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label htmlFor="endDate">Ngày kết thúc:</label>
        <DatePicker id="endDate" selected={endDate} onChange={handleEndDateChange} />
      </div>
      <button onClick={handleFetchInvoices}>Lấy hóa đơn</button>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Cửa hàng</th>
            <th>Giá trị hóa đơn</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.customerName}</td>
              <td>{invoice.storeName}</td>
              <td>{calculateTotalValue(invoice.drinks)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;