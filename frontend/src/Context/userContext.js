import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate ,useLocation, Re} from "react-router-dom";

// import { v4 as uuidv4 } from 'uuid';
const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const ContextProivider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  //signInWithEmailPassword
  const signInWithEmailPassword = (datalogin) => {
    // setIsAuthen(false);
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

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const location = useLocation();
  // if (!isLoggedIn) {
  //   navigate("/login");
  //   return null;
  // }
  const contextValue = {
    user,
    signInWithEmailPassword,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
