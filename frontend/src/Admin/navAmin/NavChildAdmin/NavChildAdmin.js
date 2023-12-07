import React from "react";
import "./NavChildAdmin.scss";
import { Link } from "react-router-dom";
import {
  ShoppingOutlined,
  SearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
function NavChildAdmin() {
  return (
    <div className="NavChildAdmin">
      <nav>
        <div className="nav_link">
          <Link to="/admin" style={{ display: "flex", lineHeight: "40px" }}>
            <HomeOutlined className="i" />
            <p className="link-name MyTikTok2">Trang chủ</p>
          </Link>
        </div>
        <div className="nav_link">
          <Link
            to="/addvoucher"
            style={{ display: "flex", lineHeight: "40px" }}
          >
            <ShoppingOutlined className="i" />
            <p className="link-name MyTikTok2">Tạo Hóa Đơn</p>
          </Link>
        </div>
        <div className="nav_link">
          <Link
            to="/searchbilladmin"
            style={{ display: "flex", lineHeight: "40px" }}
          >
            <SearchOutlined className="i" />
            <p className="link-name MyTikTok2">Tìm Kiếm</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavChildAdmin;
