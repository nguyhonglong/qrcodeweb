import React, { useState, memo } from "react";
import "./NavBar.scss";
import { auth } from "../../Firebase/Config";
import { Modal } from "antd";
import {
  MenuOutlined,
  ShoppingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";
import { Dropdown, Space } from "antd";
function NavBar() {
  const { user } = useUserContext();
  const navigateSignout = useNavigate();
  const [isModalOpenSignOuts, setIsModalOpenSignOut] = useState(false);
  const [togleMenuPhone, setTogMenuPhone] = useState(false);
  //item menu phone
  const items = [
    {
      label: (
          <Link to="/formaddvoucher" style={{ display: "flex",justifyContent:'center',alignItems:'center'  }}>
            <ShoppingOutlined className="i"  style={{margin:'0 10px'}}/>
            <p className="link-name MyTikTok2">Voucher</p>
          </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
          <Link to="/formsearchbill" style={{ display: "flex", justifyContent:'center',alignItems:'center' }}>
            <SearchOutlined className="i" style={{margin:'0 10px'}}/>
            <p className="link-name MyTikTok2">Search</p>
          </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
  ];
  // isModalOpenSignOut
  const isModalOpenSignOut = () => {
    setIsModalOpenSignOut(true);
  };
  const handleOkSignOut = () => {
    localStorage.removeItem("myArrayData");
    auth.signOut();
    navigateSignout("/login");
  };
  const handleCancelSignOut = () => {
    setIsModalOpenSignOut(false);
  };

  return (
    <div className="warpper">
      <div className="warpper_MenuOutlined">
        <div className="togleMenuPhone">
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              overlayStyle={{ width: "70%", textAlign: "center" }}
            >
              <MenuOutlined className="warpper_MenuOutlined_icon" />
            </Dropdown>
          </div>
          <div className="logOut_phone" onClick={isModalOpenSignOut}>
            <p className="btn btn-logOut">Sign out</p>
          </div>
        </div>
      </div>
      <div id="top">
        <div className="logo">
          {/* <h4>Name: {user.displayName}</h4> */}
        </div>
        <div>
          <Link
            to="/formaddvoucher"
            style={{ display: "flex" }}
            className="btn btn-nav"
          >
            <ShoppingOutlined className="i" />
            <p className="link-name MyTikTok2">Voucher</p>
          </Link>
        </div>
        <div>
          <Link
            to="/formsearchbill"
            style={{ display: "flex" }}
            className="btn btn-nav"
          >
            <SearchOutlined className="i" />
            <p className="link-name MyTikTok2">Search</p>
          </Link>
        </div>
        <div>
          <Link to="/menu" style={{ display: "flex" }} className="btn btn-nav">
            <SearchOutlined className="i" />
            <p className="link-name MyTikTok2">Menu</p>
          </Link>
        </div>
        <div className="logOut" onClick={isModalOpenSignOut}>
          <p className="btn btn-logOut">Sign out</p>
        </div>
        <Modal
          title="Sign out"
          open={isModalOpenSignOuts}
          onCancel={handleCancelSignOut}
          onOk={handleOkSignOut}
          closable={false}
        >
          <p>Are you sure you want to sign out?</p>
        </Modal>
      </div>
    </div>
  );
}

export default memo(NavBar);
