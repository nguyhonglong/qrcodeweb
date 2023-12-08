import React, {  } from "react";
import { Link, } from "react-router-dom";
// import { useUserContext } from "../Context/userContext";
import { Button, Result } from "antd";
// import Login from "../components/Authentication/Login/Login";
const PrivateRoute = (props) => {
  // const { user } = useUserContext();
  
  const retrievedValue = localStorage.getItem('datalogin');
  if (!retrievedValue) {
    
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
      {props.children}
    </>
  );
};
export default PrivateRoute;
