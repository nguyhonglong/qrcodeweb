import React, { useState, useEffect } from "react";
import { message, Table } from "antd";
import { SolutionOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import "./Dashboard.scss";
import {
  UilBars,
  UilTachometerFastAlt,
  UilClockThree,
} from "@iconscout/react-unicons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";
import NavAdmin from "../navAmin/NavAdmin/NavAdmin";



function Dashboard() {
  const { user } = useUserContext();
  const navigateSignout = useNavigate();
  const [addClass, setAddClass] = useState("open");
  const [isModalOpenSignOuts_admin, setIsModalOpenSignOut_admin] =
    useState(false);

  const [dataUser, setDataUser] = useState([]);

  //menu Toggle
  const modeToggle = () => {
    if (addClass === "open") {
      setAddClass("close");
    } else {
      setAddClass("open");
    }
  };
  ///sign out///
  // isModalOpenSignOut
  const admin_isModalOpenSignOut = () => {
    setIsModalOpenSignOut_admin(true);
  };
  const admin_handleOkSignOut = () => {
    localStorage.removeItem("myArrayData");
    localStorage.removeItem("datalogin");
    localStorage.removeItem("dataAcount");
    localStorage.removeItem("dataRoleAcount");
    localStorage.removeItem("billIDs");
    navigateSignout("/login");
  };
  const admin_handleCancelSignOut = () => {
    setIsModalOpenSignOut_admin(false);
  };

  // số user
  // useEffect(() => {
  //   getDocs(collection(db, "user")).then((snapshot) => {
  //     let arrData = [];
  //     snapshot.forEach((s) => {
  //       arrData.push(s.data());
  //     });
  //     setDataUser(arrData);
  //   });
  // }, []);
  React.useEffect(() => {
    const fetchUserData = async () => {
      await axios
        .get("https://qrcodeweb-api.vercel.app/api/users")
        .then((response) => {
          // Xử lý dữ liệu khi yêu cầu thành công
          setDataUser(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          // Xử lý lỗi khi yêu cầu không thành công
          console.error(error);
        });
    };

    fetchUserData();

    return () => {
      fetchUserData();
      // Thực hiện các tác vụ khi component bị hủy bỏ
      // Ví dụ: Hủy các kết nối, huỷ bỏ các tác vụ không cần thiết, vv.
    };
  }, []);
  //ModalEditUser
  const [error, setError] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [typeUser, setTypeUser] = useState("user");
  const [idEditUser, setIdEditUser] = useState("");
  // const [changePasswordUser, setChangePasswordUser] = useState("");
  const showModalEditUser = (data) => {
    setOpen(true);
    setIdEditUser(data);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    await axios
      .put("https://qrcodeweb-api.vercel.app/api/auth/update", {
        account: idEditUser,
        role: typeUser,
      })
      .then((response) => {
        // roles: typeUser;
        error.open({
          type: "success",
          content: "Thay đổi Thành công",
        });
      })
      .catch((err) => {
        // Xử lý lỗi nếu có
        console.error(err);
        error.open({
          type: "error",
          content: "Thay đổi thất bại",
        });
      });
    // if (changePasswordUser !== "" && changePasswordUser.length >= 6) {

    // } else {
    //   setOpen(false);
    //   setConfirmLoading(false);
    //   setTypeUser("user");
    //   // setChangePasswordUser("");
    // }
    setOpen(false);
    setConfirmLoading(false);
    setTypeUser("user");
    window.location.reload();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [sumBill, setSumBill] = useState([]);
  // const [sumMoney,setSumMoney]=useState('')
  useEffect(() => {
    // let sumTotleMony = 0;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://qrcodeweb-api.vercel.app/api/bills"
        );
        setSumBill(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchData();
  }, [idEditUser]);

  const DeleteAccount = async () => {
    try {
      await axios
        .delete(`https://qrcodeweb-api.vercel.app/api/users/${idEditUser}`)
        .then((item) => {
          setOpen(false);
          window.location.reload();
        });
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Type",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Sửa</a>,
    },
  ];
  const tableProps = {
    columns,
    dataSource: dataUser,
    scroll: {
      y: 240, // Đặt chiều cao là 240px
    },
    onRow: (record) => ({
      onClick: () => {
        showModalEditUser(record.account);
      },
    }),
  };

  // exportUser to excel

  return (
    <>
      {setError}

      <div id="AdMin">
        <NavAdmin
          admin_isModalOpenSignOut={admin_isModalOpenSignOut}
          admin_handleOkSignOut={admin_handleOkSignOut}
          admin_handleCancelSignOut={admin_handleCancelSignOut}
          isModalOpenSignOuts_admin={isModalOpenSignOuts_admin}
          addClass={addClass}
        />
        <section className="dashboard">
          <div className="top">
            <UilBars className="i UilBars" onClick={modeToggle} />
            <div className="nameAdmin MyTikTok3" style={{ fontSize: "22px" }}>
              {user.displayName}
            </div>
          </div>
          {/* <!-- dash-content --> */}
          <div className="dash-content">
            <div className="overview">
              <div className="title">
                <UilTachometerFastAlt className="i" />
                <span className="text MyTikTok2">Tổng quan</span>
              </div>

              <div className="boxes">
                <div className="box box_50 ">
                  <SolutionOutlined
                    style={{ fontSize: "35px" }}
                    className="i"
                  />
                  <span className="text MyTikTok2 fs14">Số hóa đơn</span>
                  <span className="number">{sumBill.length}</span>
                </div>
                <div className="box box_50 ">
                  <UserOutlined style={{ fontSize: "35px" }} className="i" />
                  <span className="text MyTikTok2 fs14">Số người dùng</span>
                  <span className="number">{dataUser.length}</span>
                </div>
              </div>
            </div>

            <div className="activity">
              <div className="title" style={{ margin: "30px 0 10px 25px" }}>
                <UilClockThree className="i" />
                <span className="text MyTikTok2">Quản lý tài khoản</span>
              </div>
              <Table {...tableProps}/>
             
           
            </div>
          </div>
        </section>
        {/* Modal edit user */}
        <Modal
          title="Edit user"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="Edit_type">
              <p>Type</p>
              <select
                value={typeUser}
                onChange={(e) => setTypeUser(e.target.value)}
                style={{
                  padding: "5px 20px",
                  borderRadius: "8px",
                  userSelect: "none",
                }}
              >
                <option>user</option>
                <option>babyadmin</option>
                <option>admin</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <button
                onClick={() => DeleteAccount()}
                style={{
                  backgroundColor: "#C7372F",
                  color: "#fff",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "8px",
                  marginTop: "15px",
                  cursor: "pointer",
                }}
              >
                Xóa tài khoản
              </button>
            </div>
          </div>
        </Modal>
        {/* Modal edit user */}
      </div>
    </>
  );
}

export default Dashboard;
