import React from "react";
import "./NavChildAdmin.scss";
import { Link } from "react-router-dom";
import {
  ShoppingOutlined,
  SearchOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
function NavChildAdmin() {
  return (
    <div className="NavChildAdmin">
      <nav>
        <div className="nav_link">
          <Link to="/admin" style={{ display: "flex", lineHeight: "40px" }}>
            <HomeOutlined className="i" />
            <p className="link-name MyTikTok2">Bảng điều hành</p>
          </Link>
        </div>
        <div className="nav_link">
          <Link
            to="/addvoucher"
            style={{ display: "flex", lineHeight: "40px" }}
          >
            <ShoppingOutlined className="i" />
            <p className="link-name MyTikTok2">Phiếu giảm giá</p>
          </Link>
        </div>
        <div className="nav_link">
          <Link
            to="/searchbilladmin"
            style={{ display: "flex", lineHeight: "40px" }}
          >
            <SearchOutlined className="i" />
            <p className="link-name MyTikTok2"> Tìm kiếm hóa đơn</p>
          </Link>
        </div>
        <div className="nav_link">
          <Link to="/addstore" style={{ display: "flex", lineHeight: "40px" }}>
            <PlusCircleOutlined className="i" />
            <p className="link-name MyTikTok2"> Thêm cửa hàng</p>
          </Link>
        </div>
        <div className="nav_link">
          <Link
            to="/usedinvoice"
            style={{ display: "flex", lineHeight: "40px" }}
          >
            <FileDoneOutlined className="i" />
            <p className="link-name MyTikTok2">Hóa đơn đã SD</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavChildAdmin;
