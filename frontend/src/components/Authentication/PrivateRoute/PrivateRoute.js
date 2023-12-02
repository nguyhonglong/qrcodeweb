// import React, {  useState } from "react";
// import { useNavigate ,useHistory} from "react-router-dom";
// import {  Route } from "react";
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [isAuthen, setIsAuthen] = useState(false);
//   const history = useHistory();
// //   const navigate = useNavigate();
//   const isAuthenticated = () => {
//     const auth = isAuthen;
//     return auth;
//   };

//   if (!isAuthenticated()) {
//     history.push("/login");
//     return null;
//   }

//   return <Route {...rest} render={(props) => <Component {...props} />} />;
// };
