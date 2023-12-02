import React from "react";
import "./Register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
function Register() {
  const navigate = useNavigate();
  //set err
  const [error, setError] = message.useMessage();
  //register
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const PasswordConfirm = e.target[3].value;
    if (password !== PasswordConfirm) {
      error.open({
        type: "error",
        content: "Mật khẩu xác nhận không trùng khớp",
      });
    }
    if (email && password && displayName) {
     await axios
        .post("https://github.com/nguyhonglong/qrcodeweb/api/auth/register", {
          account: email,
          password: password,
          name: displayName,
        })
        .then((response) => {
          error.open({
            type: "success",
            content: "Đã tạo tài khoản thành công",
          });
          // Xử lý phản hồi từ server
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }
  };
  return (
    <div className="register">
      {/* error */}
      {setError}
      {/* error */}
      <div className="form_container">
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div className="card-body">
                <div className="logo_container">
                  <h2 className="title">Đăng kí tài khoản</h2>
                </div>
                <form onSubmit={(e) => onSubmitRegister(e)}>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Username <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="username"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Email <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="email"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Password <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="password"
                          minLength={6}
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Password confirm{" "}
                          <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-t-15">
                    <button className="register_btn" type="submit">
                      Đăng kí
                    </button>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <p style={{ fontSize: "0.8rem", color: "#8b8e98" }}>
                      Bạn đã có tài khoản?{" "}
                      <Link to="/login" style={{ color: "#115dfc" }}>
                        Đăng nhập
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/select2/select2.min.js"></script>
        <script src="vendor/datepicker/moment.min.js"></script>
        <script src="vendor/datepicker/daterangepicker.js"></script>
        <script src="js/global.js"></script>
      </div>
    </div>
  );
}

export default Register;
