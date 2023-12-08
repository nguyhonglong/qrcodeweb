import React, { useEffect, useState, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
import { Button, Result } from "antd";
import Login from "../components/Authentication/Login/Login";
const PrivateRoute = (props) => {
  const { user } = useUserContext();
  console.log(user);
  if (user && !user.token) {
    return (
      <>
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, bạn không được phép truy cập trang này"
          extra={
            <Button type="primary">
              <Link to={"/login"}>Trở về trang đăng nhập</Link>
            </Button>
          }
        />
        {/* <Login /> */}
      </>
    );
  }
  return (
    <>
      {/* <Routes>
        <Route path={props.path} element={props.children} />
      </Routes> */}
      {props.children}
    </>
  );
};
export default PrivateRoute;
