import React, { useState, useEffect } from "react";
import "./TableBill.scss";
import axios from "axios";
import { Modal } from "antd";
import InvoiceBill from "../../../cpnTemplate/InvoiceBill/InvoiceBill";
function TableBill(props) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const calculateTotal = (data) => {
    let total = 0;
    // Lặp qua danh sách đồ uống và tính tổng tiền
    data.drinks.forEach((drink) => {
      total += drink.quantity * drink.price;
    });
    return total;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState([]);
  const showModal = (data) => {
    setIsModalOpen(true);
    setDataOpen(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [drinkPrices, setDrinkPrices] = useState({});
  useEffect(() => {
    fetchDrinkPrices();
  }, []);

  const fetchDrinkPrices = async () => {
    try {
      const response = await axios.get("https://qrcodeweb-api.vercel.app/api/drinks");
      const drinks = response.data;
      const prices = {};

      for (const drink of drinks) {
        prices[drink.name] = drink.price;
      }

      setDrinkPrices(prices);
    } catch (error) {
      console.error("Error fetching drink prices:", error);
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

  return (
    <div id="TableBill">
      <div className="container">
        <div className="table">
          <div className="table-header">
            <div className="header__item">
              <a id="name" className="filter__link">
                Tên
              </a>
            </div>
            <div className="header__item">
              <a id="wins" className="filter__link filter__link--number">
                MÃ ĐƠN
              </a>
            </div>
            <div className="header__item">
              <a id="draws" className="filter__link filter__link--number">
                Ngày
              </a>
            </div>
            <div className="header__item">
              <a id="losses" className="filter__link filter__link--number">
                Số người
              </a>
            </div>
            <div className="header__item">
              <a id="total" className="filter__link filter__link--number">
                Tổng
              </a>
            </div>
          </div>
          <div className="table-content">
            {props.billToDate?.map((data) => (
              <div
                className="table-row"
                key={data._id}
                onClick={() => showModal(data)}
              >
                <div className="table-data">{data.customerName}</div>
                <div className="table-data">{data.billID}</div>
                <div className="table-data">{formatDate(data.createdAt)}</div>
                <div className="table-data">{data.numCustomer}</div>
                <div className="table-data">
                  {calculateTotalValue(data.drinks)}.000VNĐ 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title="Chi tiết hóa đơn"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="myModal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ marginTop: "-60px" }}>
          <InvoiceBill billData={dataOpen}/>
        </div>
      </Modal>
    </div>
  );
}

export default TableBill;
