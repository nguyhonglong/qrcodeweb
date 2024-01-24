import React, { useState, useEffect,useCallback } from "react";
import "./TableBill.scss";
import axios from "axios";
import { Modal, Spin, Table, Button, Tooltip } from "antd";
import { DeleteFilled, FileExcelOutlined } from "@ant-design/icons";
import InvoiceBill from "../../../cpnTemplate/InvoiceBill/InvoiceBill";
import { message } from "antd";
import { CSVLink } from "react-csv";
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
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelDeleteBill = () => {
    setIsModalOpenDeleTeBill(false);
  };
  const showDeleteBill = (data) => {
    setIsModalOpenDeleTeBill(true);
    setdataDeleTeBill(data);
  };
  const [billToDateData, setBillToDateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataIdAcount = localStorage.getItem("dataAcount");
        const dataRoleAcount = localStorage.getItem("dataRoleAcount");
        if (dataRoleAcount === "admin") {
          setBillToDateData(props.billToDate);
        } else {
          const foundItem = await props.billToDate.filter(
            (item) => item.createdUserId === dataIdAcount
          );
          setBillToDateData(foundItem);
        }
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    fetchData();
  }, [props.billToDate]);
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
            console.log(response);
            const dataIdAcount = localStorage.getItem("dataAcount");
            const dataRoleAcount = localStorage.getItem("dataRoleAcount");
            if (dataRoleAcount === "admin") {
              setBillToDateData(response.data);
            } else {
              const dataBillDate = response.data;
              const foundItem = dataBillDate.filter(
                (item) => item.createdUserId === dataIdAcount
              );
              setBillToDateData(foundItem);
            }
          } catch (error) {
            console.error("Error fetching drinks:", error);
          }
          setIsLoading(false);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTotalValue = useCallback((drinks) => {
    let total = 0;
    for (const drink of drinks) {
      const price = drinkPrices[drink.drink];
      total += drink.quantity * price;
    }
    return total;
  });
  const [totalSumInv, setTotalSumInv] = useState("");

  const columns = [
    {
      className: "center-align-table",
      title: "NGƯỜI TẠO",
      dataIndex: "createdUser",
      key: "createdUser",
      width: 120,
      ellipsis: true,
      fixed: "left",
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: "MÃ ĐƠN",
      dataIndex: "billID",
      key: "billID",
      ellipsis: true,
      width: 120,
      align: "center",
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: "CỬA HÀNG",
      dataIndex: "storeName",
      key: "storeName",
      width: 150,
      align: "center",
      render: (text) => (
        <Tooltip title={"Tên cửa hàng: " + text}>{text}</Tooltip>
      ),
    },
    {
      className: "center-align-table",
      title: "TÊN",
      dataIndex: "customerName",
      key: "customerName",
      width: 150,
      ellipsis: true,
      render: (text) => <Tooltip title={"Tên KH: " + text}>{text}</Tooltip>,
    },
    {
      title: "NGÀY",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      width: 150,
      align: "center",
      render: (text) => (
        <Tooltip title={formatDate(text)}>{formatDate(text)}</Tooltip>
      ),
    },
    {
      title: <Tooltip title="SỐ NGƯỜI">SỐ NGƯỜI</Tooltip>,
      dataIndex: "numCustomer",
      key: "numCustomer",
      align: "center",
      ellipsis: true,
      width: 90,
      render: (text) => <Tooltip title={"Số người: " + text}>{text}</Tooltip>,
    },
    {
      title: "TỔNG",
      dataIndex: "drinks",
      key: "drinks",
      ellipsis: true,
      align: "center",
      width: 130,
      render: (text) => (
        <Tooltip title={"Tổng tiền: " + calculateTotalValue(text) + ".000VNĐ"}>
          {calculateTotalValue(text) + ".000VNĐ"}
        </Tooltip>
      ),
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "isUsed",
      key: "isUsed",
      ellipsis: true,
      align: "center",
      width: 110,
      render: (text) =>
        text ? (
          <div>
            <Button type="primary" size="small" danger>
              Đã Dùng
            </Button>
          </div>
        ) : (
          <div>
            <Button type="primary" size="small">
              Chưa SD
            </Button>
          </div>
        ),
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
          <Tooltip title="Xóa">
            <DeleteFilled className="DeleteTwoTone" />
          </Tooltip>
        </div>
      ),
    },
  ];
  const data = billToDateData;
  const rowProps = (record) => {
    return {
      onClick: () => {
        showModal(record);
      },
    };
  };

  // conver data
  const [datacv, setDataCV] = useState([]);
  useEffect(() => {
    const updatedData = [...data];
    for (const item of updatedData) {
      const totalValue = calculateTotalValue(item.drinks);
      item.totalcv = totalValue + "000";
    }
    for (const item of updatedData) {
      const dateValue = formatDate(item.createdAt);
      item.datecv = dateValue;
    }
    setDataCV(updatedData);
  }, [calculateTotalValue, data]);

  const headers = [
    { label: "Người tạo đơn", key: "createdUser" },
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
            style={{ marginTop: "50px" }}
            scroll={{
              x: 1000,
              y: 400,
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
