import React from "react";
import "./NavAdmin.scss";
import { UilSignout, UilMoon } from "@iconscout/react-unicons";
import {
  SearchOutlined,
  ShoppingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Link } from "react-router-dom";

function NavAdmin(props) {
  const {
    admin_isModalOpenSignOut,
    admin_handleOkSignOut,
    admin_handleCancelSignOut,
    isModalOpenSignOuts_admin,
    addClass,
  } = props;
  return (
    <nav className={addClass === "open" ? "open" : "close"}>
      <div className="logo-name">
        <span className="logo_name MyTikTok1" style={{ fontSize: "28px" }}>
          Trang quản lý
        </span>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          <li>
            <span>
              <Link to="/admin" style={{ display: "flex" }}>
                <HomeOutlined className="i" />
                <p
                  className="link-name MyTikTok2"
                  style={{ lineHeight: "35px" }}
                >
                  Bảng điều hành
                </p>
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/addvoucher" style={{ display: "flex" }}>
                <ShoppingOutlined className="i" />
                <p
                  className="link-name MyTikTok2"
                  style={{ lineHeight: "35px" }}
                >
                  Tạo phiếu giảm giá
                </p>
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/searchbilladmin" style={{ display: "flex" }}>
                <SearchOutlined className="i" />
                <p
                  className="link-name MyTikTok2"
                  style={{ lineHeight: "35px" }}
                >
                  Tìm kiếm hóa đơn
                </p>
              </Link>
            </span>
          </li>
        </ul>

        <ul className="logout-mode">
          <li onClick={admin_isModalOpenSignOut}>
            <span>
              <UilSignout className="i" />
              <span className="link-name MyTikTok2">Đăng xuất</span>
            </span>
          </li>
          <Modal
            title="Sign out"
            open={isModalOpenSignOuts_admin}
            onCancel={admin_handleCancelSignOut}
            onOk={admin_handleOkSignOut}
            closable={false}
          >
            <p>Are you sure you want to sign out?</p>
          </Modal>
        </ul>
      </div>
    </nav>
  );
}

export default NavAdmin;
