import React, { useState, useEffect } from "react";
import "./TableBill.scss";
import axios from "axios";
import { Modal, Popconfirm, Button } from "antd";
import { DeleteFilled, QuestionCircleOutlined } from "@ant-design/icons";
import InvoiceBill from "../../../cpnTemplate/InvoiceBill/InvoiceBill";
import { message } from "antd";
function TableBill(props) {
  const [successMess, setSuccessMess] = message.useMessage();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  // const calculateTotal = (data) => {
  //   let total = 0;
  //   // Lặp qua danh sách đồ uống và tính tổng tiền
  //   data.drinks.forEach((drink) => {
  //     total += drink.quantity * drink.price;
  //   });
  //   return total;
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState([]);
  const showModal = (data) => {
    setIsModalOpen(true);
    setDataOpen(data);
    setTotalSumInv(calculateTotalValue(data.drinks));
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenDeleTeBill, setIsModalOpenDeleTeBill] = useState(false);
  const [dataDeleTeBill, setdataDeleTeBill] = useState(false);
  const handleCancelDeleteBill = () => {
    setIsModalOpenDeleTeBill(false);
  };
  const showDeleteBill = (data) => {
    setIsModalOpenDeleTeBill(true);
    setdataDeleTeBill(data);
  };
  const [billToDateData, setBillToDateData]= useState([])
  useEffect(()=>{
    setBillToDateData(props.billToDate)
    
  },[props.billToDate])
  // Handle DeleTe Bill
  const HandleDeleTeBill = async () => {
    console.log(dataDeleTeBill.billID);
    try {
      await axios
        .delete(
          `https://qrcodeweb-api.vercel.app/api/deleteBill/${dataDeleTeBill.billID}`
        )
        .then((data) => {
          console.log(data);
          setBillToDateData(props.billToDate)
          setIsModalOpenDeleTeBill(false);
          successMess.open({
            type: "success",
            content: "Xóa hóa đơn thành công",
          });
        })
        .catch((err) => {
          console.log("delete:", err);
          successMess.open({
            type: "error",
            content: "Xóa hóa đơn thất bại",
          });
        });
    } catch (error) {
      console.error("Error deleting drink: ", error);
    }
  };

  const [drinkPrices, setDrinkPrices] = useState({});
  useEffect(() => {
    fetchDrinkPrices();
  }, []);

  const fetchDrinkPrices = async () => {
    try {
      const response = await axios.get(
        "https://qrcodeweb-api.vercel.app/api/drinks"
      );
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
  const [totalSumInv, setTotalSumInv] = useState("");
  return (
    <>
      {setSuccessMess}
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
              <div className="header__item header__item-delete">
                <a id="total" className="filter__link filter__link--number">
                  Xóa
                </a>
              </div>
            </div>
            <div className="table-content">
            {billToDateData?.map((data) => (
                <div className="table-row" key={data._id}>
                  <div
                    className="table-data"
                    onClick={() => {
                      showModal(data);
                    }}
                  >
                    {data.customerName}
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      showModal(data);
                    }}
                  >
                    {data.billID}
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      showModal(data);
                    }}
                  >
                    {formatDate(data.createdAt)}
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      showModal(data);
                    }}
                  >
                    {data.numCustomer}
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      showModal(data);
                    }}
                  >
                    {calculateTotalValue(data.drinks)}.000VNĐ
                  </div>
                  <div
                    className="table-data table-data-delete"
                    onClick={() => {
                      showDeleteBill(data);
                    }}
                  >
                    <DeleteFilled className="DeleteTwoTone" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal
          title="Chi tiết hóa đơn"
          open={isModalOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className="myModal"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ marginTop: "-60px" }}>
            <InvoiceBill billData={dataOpen} totalSumInv={totalSumInv} />
          </div>
        </Modal>
        <Modal
          title="Xóa Hóa Đơn"
          open={isModalOpenDeleTeBill}
          onOk={HandleDeleTeBill}
          onCancel={handleCancelDeleteBill}
          className="myModal_deleteBill"
        >
          <p>Bạn có chắc chắn muốn xóa?</p>
        </Modal>
      </div>
    </>
  );
}

export default TableBill;
