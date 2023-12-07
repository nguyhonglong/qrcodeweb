import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import "./Dashboard.scss";
import {
  UilBars,
  UilTachometerFastAlt,
  UilClockThree,
} from "@iconscout/react-unicons";
import {
  SolutionOutlined,
  UserOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";
import NavAdmin from "../navAmin/NavAdmin/NavAdmin";
function Dashboard() {
  const { user } = useUserContext();
  const navigateSignout = useNavigate();
  const [addClass, setAddClass] = useState("open");
  const [isModalOpenSignOuts_admin, setIsModalOpenSignOut_admin] =
    useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

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
          console.log(response.data);
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
  console.log(dataUser);
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
        account:idEditUser,
        role:typeUser
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
    // setChangePasswordUser("");
    // if (checkDelete) {
    //   const userValue = auth.currentUser;
    //   userValue.delete().then(() => {
    //     deleteDoc(doc(db, "user", idEditUser));
    //   });
    //   await deleteDoc(doc(db, "user", idEditUser));
    // }
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
        const response = await axios.get("https://qrcodeweb-api.vercel.app/api/bills");
        setSumBill(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchData();
  }, [idEditUser]);
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
                  <span className="text MyTikTok2">Số hóa đơn</span>
                  <span className="number">{sumBill.length}</span>
                </div>
                {/* <div className="box box2">
                <PayCircleOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Tổng thu nhập</span>
                <span className="number">0</span>
              </div> */}
                <div className="box box_50 ">
                  <UserOutlined style={{ fontSize: "35px" }} className="i" />
                  <span className="text MyTikTok2">Số người dùng</span>
                  <span className="number">{dataUser.length}</span>
                </div>
              </div>
            </div>

            <div className="activity">
              <div className="title" style={{ margin: "30px 0 30px 25px" }}>
                <UilClockThree className="i" />
                <span className="text MyTikTok2">Quản lý tài khoản</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="activity-data">
                  <div>
                    <span className="data-title MyTikTok2">Tên người dùng</span>
                    <div className="data names MyTikTok2">
                      {dataUser.map((data) => (
                        <span
                          key={data.id}
                          style={{ cursor: "pointer" }}
                          className="data-list"
                          onClick={() => {
                            showModalEditUser(data.account);
                          }}
                        >
                          <Tooltip title={data.name}>{data.name}</Tooltip>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="data-title">Email</span>
                    <div className="data email MyTikTok2">
                      {dataUser.map((data) => (
                        <span
                          key={data.id}
                          style={{ cursor: "pointer" }}
                          className="data-list"
                          onClick={() => {
                            showModalEditUser(data.account);
                          }}
                        >
                          <Tooltip title={data.account}>{data.account}</Tooltip>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="data-title">Loại</span>
                    <div className="data type">
                      {dataUser.map((data) => (
                        <span
                          key={data.id}
                          className="data-list"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            showModalEditUser(data.account);
                          }}
                        >
                          {data.role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                onClick={() => setCheckDelete(!checkDelete)}
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
              {checkDelete ? (
                <CheckOutlined
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginLeft: "12px",
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal>
        {/* Modal edit user */}
      </div>
    </>
  );
}

export default Dashboard;
