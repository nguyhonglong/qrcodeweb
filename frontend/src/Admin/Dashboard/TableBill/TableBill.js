import React, { useState, useEffect } from "react";
import "./TableBill.scss";
import axios from "axios";
import { Modal, Spin, Table } from "antd";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState([]);
  const showModal = (data) => {
    setIsModalOpen(true);
    setDataOpen(data);
    setTotalSumInv(calculateTotalValue(data.drinks));
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenDeleTeBill, setIsModalOpenDeleTeBill] = useState(false);
  const [dataDeleTeBill, setdataDeleTeBill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelDeleteBill = () => {
    setIsModalOpenDeleTeBill(false);
  };
  const showDeleteBill = (data) => {
    setIsModalOpenDeleTeBill(true);
    setdataDeleTeBill(data);
  };
  // Handle DeleTe Bill
  const HandleDeleTeBill = async () => {
    setIsLoading(true);
    try {
      await axios
        .delete(
          `https://qrcodeweb-api.vercel.app/api/deleteBill/${dataDeleTeBill.billID}`
        )
        .then(async () => {
          try {
            const response = await axios.get(
              `https://qrcodeweb-api.vercel.app/api/records?startDate=${props.dateRange[0]?.format(
                "YYYY-MM-DD"
              )}&endDate=${props.dateRange[1]?.format("YYYY-MM-DD")}`
            );
            setBillToDateData(response.data);
          } catch (error) {
            console.error("Error fetching drinks:", error);
          }
          setIsLoading(false);
          setIsModalOpenDeleTeBill(false);
        })
        .catch((err) => {
          console.log("delete:", err);
          successMess.open({
            type: "error",
            content: "Xóa hóa đơn thất bại",
          });
        });
        
        fetchData();
    } catch (error) {
      console.error("Error deleting drink: ", error);
    }
    setIsLoading(false);
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

  const columns = [
    {
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
      width: 115,
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
      title: "XÓA",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự lan truyền của sự kiện click
            showDeleteBill(record); // Hiển thị xóa hóa đơn cho bản ghi cụ thể
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <DeleteFilled className="DeleteTwoTone" />
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
      <div id="TableBill">
        <div className="container">
          {/* <div className="table">
            <div className="table-header">
              <div className="header__item">
                <p className="filter__link filter__link--number">Người Tạo</p>
              </div>
              <div className="header__item">
                <p className="filter__link filter__link--number">Cửa hàng</p>
              </div>
              <div className="header__item">
                <p className="filter__link filter__link--number">MÃ ĐƠN</p>
              </div>
              <div className="header__item">
                <p className="filter__link">Tên</p>
              </div>
              <div className="header__item">
                <p className="filter__link filter__link--number">Ngày</p>
              </div>
              <div className="header__item">
                <p className="filter__link filter__link--number">Số người</p>
              </div>
              <div className="header__item">
                <p className="filter__link filter__link--number">Tổng</p>
              </div>
              <div className="header__item header__item-delete">
                <p className="filter__link filter__link--number">Xóa</p>
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
                    {data.billID}
                  </div>
                  <div
                    className="table-data"
                    onClick={() => {
                      showModal(data);
                    }}
                  >
                    {data.storeName}
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
                    {data.customerName}
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
          </div> */}
          <Table
          style={{marginTop:'50px'}}
            scroll={{
              x: 1000,
              y: 400,
            }}
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
          title="Xóa Hóa Đơn"
          open={isModalOpenDeleTeBill}
          onOk={HandleDeleTeBill}
          onCancel={handleCancelDeleteBill}
          className="myModal_deleteBill"
        >
          <p>Bạn có chắc chắn muốn xóa?</p>
          {isLoading ? (
            <Spin tip="Đang xóa">
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

export default TableBill;
