import React, { useState, useEffect } from "react";
import "./UsedInvoice.scss";
import axios from "axios";
import { Modal, Table, Button } from "antd";
// import { Filled, QuestionCircleOutlined } from "@ant-design/icons";
import InvoiceBill from "../../../cpnTemplate/InvoiceBill/InvoiceBill";
import NavChildAdmin from "../../navAmin/NavChildAdmin/NavChildAdmin";
import { message } from "antd";
import { CSVLink } from "react-csv";
import { FileExcelOutlined } from "@ant-design/icons";
function UsedInvoice(props) {
  const [successMess, setSuccessMess] = message.useMessage();
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState([]);
  const showModal = (data) => {
    console.log(data);
    setIsModalOpen(true);
    setDataOpen(data);
    setTotalSumInv(calculateTotalValue(data.drinks));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const [billToDateData, setBillToDateData] = useState([]);
  useEffect(() => {
    setBillToDateData(props.billToDate);
    // console.log(props.billToDate);
  }, [props.billToDate]);
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

  //   const HandleUseBill = async (dataBill) => {
  //     const newData = {
  //       billID: dataBill.billID,
  //       numCustomer: dataBill.numCustomer,
  //       customerName: dataBill.customerName,
  //       storeName: dataBill.storeName,
  //       drinks: dataBill.drinks,
  //       updateAccount: dataBill.createdUser,
  //       isUsed: true,
  //     };
  //     await axios
  //       .put(
  //         `https://qrcodeweb-api.vercel.app/api/bills/${dataBill.billID}`,
  //         newData
  //       )
  //       .then(async () => {
  //         const response = await axios.get(
  //           `https://qrcodeweb-api.vercel.app/api/bills`
  //         );
  //         const billData = response.data;
  //         const savedBillIDs = localStorage.getItem("billIDs");
  //         const parsedBillIDs = JSON.parse(savedBillIDs);
  //         const foundBills = [];
  //         for (const billID of parsedBillIDs) {
  //           const foundBill = billData.filter((bill) => bill.billID === billID);
  //           if (foundBill) {
  //             foundBills.push(...foundBill);
  //           }
  //         }
  //         console.log(foundBills);
  //         setBillToDateData(foundBills);

  //         successMess.open({
  //           type: "success",
  //           content: "Sử dụng hóa đơn thành công",
  //         });
  //       })
  //       .catch((err) => {
  //         successMess.open({
  //           type: "error",
  //           content: "Sử dụng hóa đơn thất bại",
  //         });
  //       });
  //   };
  const columns = [
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
      align: "center",
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
      key: "_id",
      ellipsis: true,
      align: "center",
      width: 130,
      render: (text) => calculateTotalValue(text) + ".000VNĐ",
    },
    {
      title: "SD",
      dataIndex: "isUsed",
      key: "isUsed",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" size="small" danger>
              Đã Dùng
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const [bills, setBills] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://qrcodeweb-api.vercel.app/api/bills"
        );
        const dataIsUsed = response.data.filter((item) => item.isUsed === true);
        const reversedData = [...dataIsUsed].reverse();
        setBills(reversedData);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchData();
  }, []);
  const data = bills;
  //   console.log(data);
  const rowProps = (record) => {
    return {
      onClick: () => {
        showModal(record);
      },
    };
  };


// conver data
const [datacv, setDataCV] = useState([]);

useEffect( () => {
  const updatedData = [...data];
  for (const item of updatedData) {
    const totalValue = calculateTotalValue(item.drinks);
    item.totalcv = totalValue + "000";
  }
  for (const item of updatedData) {
    const dateValue = formatDate(item.createdAt);
    item.datecv = dateValue;
  }
  setDataCV(updatedData)
}, [calculateTotalValue, data]);


 const headers = [
    { label: "Mã hóa đơn", key: "billID" },
    { label: "Cửa hàng", key: "storeName" },
    { label: "Tên", key: "customerName" },
    { label: "Ngày tạo", key: "datecv" },
    { label: "Số người", key: "numCustomer" },
    { label: "Tổng tiền", key: "totalcv" },
    { label: "Trạng thái sử dụng", key: "isUsed" },
  ];
  

  return (
    <>
      {setSuccessMess}
      <NavChildAdmin />
      <div id="UsedInvoice">
        <h3 className="title">Hóa đơn đã sử dụng</h3>
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
          <Button
            style={{ backgroundColor: "#217346", marginTop: "-16px" }}
            icon={<FileExcelOutlined style={{ color: "#fff" }} />}
          >
            <CSVLink data={datacv} headers={headers} style={{ color: "#fff" }}>
              {" " + "Xuất Excel"}
            </CSVLink>
          </Button>
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
        {/* <Modal
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
        </Modal> */}
      </div>
    </>
  );
}

export default UsedInvoice;
