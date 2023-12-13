import React, { useState, useEffect } from "react";
import "./TableBillUser.scss";
import axios from "axios";
import { Modal, Spin, Table, Button, Radio } from "antd";
import { Filled, QuestionCircleOutlined } from "@ant-design/icons";
import InvoiceBill from "../../cpnTemplate/InvoiceBill/InvoiceBill";
import { message } from "antd";
function TableBillUser(props) {
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

  const [isModalOpenBill, setIsModalOpenBill] = useState(false);
  const [dataBill, setdataBill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelUseBill = () => {
    setIsModalOpenBill(false);
  };
  const showBill = (data) => {
    setIsModalOpenBill(true);
    setdataBill(data);
  };
  const [billToDateData, setBillToDateData] = useState([]);
  useEffect(() => {
    setBillToDateData(props.billToDate);
  }, [props.billToDate]);
  // Handle  Bill
  //   const HandleBill = async () => {
  //     setIsLoading(true);
  //     try {
  //       await axios
  //         .(
  //           `https://qrcodeweb-api.vercel.app/api/Bill/${dataBill.billID}`
  //         )
  //         .then(async () => {
  //           try {
  //             const response = await axios.get(
  //               `https://qrcodeweb-api.vercel.app/api/records?startDate=${props.dateRange[0]?.format(
  //                 "YYYY-MM-DD"
  //               )}&endDate=${props.dateRange[1]?.format("YYYY-MM-DD")}`
  //             );
  //             setBillToDateData(response.data);
  //           } catch (error) {
  //             console.error("Error fetching drinks:", error);
  //           }
  //           setIsLoading(false);
  //           setIsModalOpenBill(false);
  //           successMess.open({
  //             type: "success",
  //             content: "Xóa hóa đơn thành công",
  //           });
  //         })
  //         .catch((err) => {
  //           console.log(":", err);
  //           successMess.open({
  //             type: "error",
  //             content: "Xóa hóa đơn thất bại",
  //           });
  //         });
  //     } catch (error) {
  //       console.error("Error deleting drink: ", error);
  //     }
  //     setIsLoading(false);
  //   };

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


  const HandleUseBill = (data)=>{

  }
  const columns = [
    {
      className: "center-align-table",
      title: "NGƯỜI TẠO",
      dataIndex: "customerName",
      key: "customerName",
      width: 150,
      ellipsis: true,
      fixed: "left",
    },
    {
      title: "MÃ ĐƠN",
      dataIndex: "billID",
      key: "billID",
      ellipsis: true,
      width: 120,
      align: "center",
    },
    {
      title: "CỬA HÀNG",
      dataIndex: "storeName",
      key: "storeName",
      width: 150,
      align: "center",
    },
    {
      className: "center-align-table",
      title: "TÊN",
      dataIndex: "customerName",
      key: "customerName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "NGÀY",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      width: 150,
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "SỐ NGƯỜI",
      dataIndex: "numCustomer",
      key: "numCustomer",
      align: "center",
      ellipsis: true,
      width: 100,
    },
    {
      title: "TỔNG",
      dataIndex: "drinks",
      key: "drinks",
      ellipsis: true,
      align: "center",
      width: 130,
      render: (text) => calculateTotalValue(text) + ".000VNĐ",
    },
    {
      title: "SD",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <div
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự lan truyền của sự kiện click
            showBill(record); // Hiển thị xóa hóa đơn cho bản ghi cụ thể
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button type="primary" size="small">
            Sử Dụng
          </Button>
        </div>
      ),
    },
  ];
  const data = billToDateData;
  // console.log(data);
  const rowProps = (record) => {
    return {
      onClick: () => {
        showModal(record);
      },
    };
  };
  return (
    <>
      {setSuccessMess}
      <div id="TableBillUser">
        <div className="container">
          <Table
            scroll={{
              x: 1000,
              y: 350,
            }}
            responsive="stack" 
            columns={columns}
            dataSource={data}
            onRow={(record) => ({
              ...rowProps(record),
            })}
          />
        </div>
        <Modal
          title="Chi tiết hóa đơn"
          open={isModalOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className="myModal"
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ marginTop: "-60px" }}>
            <InvoiceBill billData={dataOpen} totalSumInv={totalSumInv} />
          </div>
        </Modal>
        <Modal
          title="Sử Dụng Hóa Đơn"
          open={isModalOpenBill}
          onOk={HandleUseBill}
          onCancel={handleCancelUseBill}
        >
          <p>Bạn có muốn sử dụng hóa đơn?</p>
          {isLoading ? (
            <Spin tip="Đang tiến hành sử dụng">
              <div className="content" />
            </Spin>
          ) : (
            ""
          )}
        </Modal>
      </div>
    </>
  );
}

export default TableBillUser;
