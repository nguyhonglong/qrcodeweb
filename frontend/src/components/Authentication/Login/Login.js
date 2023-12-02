import React, { useRef, useState } from "react";
import "./Login.scss";
import { useUserContext } from "../../../Context/userContext";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
function Login() {
  const navigate = useNavigate();
  const [hideShowPassword, setHideShowPassword] = useState(false);
  const { signInWithEmailPassword } = useUserContext();
  const [error, setError] = message.useMessage();
  const emaiSignIn = useRef();
  const passwordSignIn = useRef();
  //signIn
  const signIn = async () => {
    const email = emaiSignIn.current.value.toString();
    const password = passwordSignIn.current.value.toString();
    if (email && password) {
      await axios
        .post("https://qrcodeweb-api.vercel.app/api/auth/login", {
          //30072002
          account: email,
          password: password,
        })
        .then((response) => {
          // Xử lý phản hồi từ server
          signInWithEmailPassword(response.data);
        })
        .catch((err) => {
          // Xử lý lỗi nếu có
          console.error(err);
          error.open({
            type: "error",
            content: "tài khoản hoặc mật khẩu không đúng hãy nhập lại",
          });
        });
    }else{
      error.open({
        type: "warning",
        content: "Hãy Kiểm tra lại thông tin",
      });
    }
  };
  //togglePassword
  const togglePassword = () => {
    const passwordInput = document.getElementById("password_field");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setHideShowPassword(true);
    } else {
      passwordInput.type = "password";
      setHideShowPassword(false);
    }
  };
  return (
    <>
    {setError}
    <div className="Login">
      <div className="form_container">
        <div className="title_container">
          <p className="title">Đăng nhập</p>
          <span className="subtitle">
            Get started with our website, just create an account and enjoy the
            experience.
          </span>
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>
          <input
            placeholder="name@mail.com"
            title="Email"
            name="input-name"
            type="text"
            className="input_field"
            id="email_field"
            ref={emaiSignIn}
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <input
            placeholder="Password"
            title="Password"
            name="input-name"
            type="password"
            className="input_field"
            id="password_field"
            ref={passwordSignIn}
          />
          <div onClick={togglePassword}>
            {hideShowPassword ? (
              <i className="EyeOutlined">
                <EyeOutlined />
              </i>
            ) : (
              <i className="EyeOutlined">
                <EyeInvisibleOutlined />
              </i>
            )}
          </div>
        </div>
        <button className="sign-in_btn" onClick={signIn}>
          <span>Đăng nhập</span>
        </button>
        <p className="note">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="note_register">
            Đăng kí
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
