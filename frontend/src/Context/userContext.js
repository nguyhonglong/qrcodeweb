import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { v4 as uuidv4 } from 'uuid';
const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const ContextProivider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  //signInWithEmailPassword
  const signInWithEmailPassword = (datalogin) => {
    // setIsAuthen(false);
    localStorage.setItem("datalogin", datalogin.token);
    localStorage.setItem("dataAcount", datalogin.user._id);
    localStorage.setItem("dataRoleAcount", datalogin.user.role);
    // console.log(datalogin);
    setUser(datalogin);
    switch (datalogin.user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "babyadmin":
        navigate("/babyadmin");
        break;
      case "user":
        navigate("/user");
        break;
      default:
        navigate("/login");
        break;
    }
  };

  // xóa dữ liệu khi rời khỏi trang 
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Thêm thông điệp xác nhận trước khi người dùng rời khỏi trang
      e.preventDefault();
      e.returnValue = "";
      localStorage.removeItem("myArrayData");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const contextValue = {
    user,
    signInWithEmailPassword,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
