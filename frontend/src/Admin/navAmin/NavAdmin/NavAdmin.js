import React from "react";
import "./NavAdmin.scss";
import { UilSignout, UilMoon } from "@iconscout/react-unicons";
import {
  SearchOutlined,
  ShoppingOutlined,
  HomeOutlined,
  PlusCircleOutlined,
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
        <span className="logo_name MyTikTok1" style={{ fontSize: "26px" }}>
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
                  Bảng Điều Hành
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
          <li>
            <span>
              <Link to="/addstore" style={{ display: "flex" }}>
                <PlusCircleOutlined className="i" />
                <p
                  className="link-name MyTikTok2"
                  style={{ lineHeight: "35px" }}
                >
                  Thêm cửa hàng
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
            title="Đăng xuất"
            open={isModalOpenSignOuts_admin}
            onCancel={admin_handleCancelSignOut}
            onOk={admin_handleOkSignOut}
            closable={false}
          >
            <p>Bạn có muốn đăng xuất không?</p>
          </Modal>
        </ul>
      </div>
    </nav>
  );
}

export default NavAdmin;
