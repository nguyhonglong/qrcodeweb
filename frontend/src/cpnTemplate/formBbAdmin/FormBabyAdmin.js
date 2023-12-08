import "./FormBabyAdmin.scss";
import axios from "axios";
import React, { useState, memo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../../Context/userContext";
import { Button, Form, Input, Select, InputNumber, message } from "antd";
import html2canvas from "html2canvas";

const { Option } = Select;
function FormBabyAdmin() {
  const { user } = useUserContext();
  const [form] = Form.useForm();
  const [successMess, setSuccessMess] = message.useMessage();
  const [codeNew, setCodeNew] = useState([]);
  // Handler khi submit form
  const handleSubmit = async (values) => {
    const id = uuidv4(); // Tạo ID tự động
    // Định dạng ID thành chuỗi kết hợp giữa kí tự và số
    const formattedID = "TXT" + id.substring(0, 6).toUpperCase(); // Lấy 8 kí tự đầu và chuyển thành chữ hoa
    const commonDrink = drinks.filter((nameDrink) =>
      selectedDrinks.includes(nameDrink.name)
    );
    // console.log(selectedDrinks);
    // console.log(drinks);
    const billID = formattedID;
    const numCustomer = valueQuantityUser;
    const customerName = values.customerName;
    const storeName = values.storeName;

    const drinkData = commonDrink.map((drink) => ({
      drink: drink.name,
      quantity: values[`quantity_${drink.name}`],
      price: drink.price,
    }));
    const formData = {
      billID: billID,
      numCustomer: numCustomer,
      customerName: customerName,
      storeName: storeName,
      drinks: drinkData,
    };

    console.log("Form Data:", JSON.stringify(formData));

    // Gửi dữ liệu formData lên server
    await axios
      .post("https://qrcodeweb-api.vercel.app/api/bills", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        setCodeNew(response.data);
        successMess.open({
          type: "success",
          content: "Thêm hóa đơn thành công",
        });
      })
      .catch((error) => {
        // Xử lý lỗi khi yêu cầu không thành công
        console.log("Error submitting data:", error);
        successMess.open({
          type: "error",
          content: "Thêm hóa đơn thất bại",
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // valueQuantityUser
  const [valueQuantityUser, setValueQuantityUser] = useState(1);

  const quantityUser = (value) => {
    setValueQuantityUser(value);
  };
  //   SelectStore
  const onChangeSelectStore = (value) => {
    // console.log(`selected ${value}`);
  };
  const onSearchStore = (value) => {
    // console.log("search:", value);
  };
  // chọn đồ uống

  const [selectedDrinks, setSelectedDrinks] = useState([]);

  // Handler khi thay đổi lựa chọn đồ uống
  const handleDrinkChange = (value) => {
    setSelectedDrinks(value);
  };

  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://qrcodeweb-api.vercel.app/api/drinks"
        );
        setDrinks(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchData();
  }, [user]);

  const renderDrinkOptions = () => {
    return drinks.map((drink) => (
      <Option key={drink._id} value={drink.name}>
        {drink.name}
      </Option>
    ));
  };


  const captureAndSaveImage = () => {
    const element = document.getElementById("myDiv");
    html2canvas(element).then(function (canvas) {
      const image = canvas.toDataURL("image/png");

      // Tạo một liên kết tải xuống
      const link = document.createElement("a");
      link.href = image;
      link.download = "myImage.png";

      // Gợi ý người dùng lưu tệp tin vào ổ đĩa D: tải xuống
      link.setAttribute("download", "D:\\download\\myImage.png");

      // Thêm liên kết vào trang
      document.body.appendChild(link);

      // Kích hoạt sự kiện nhấp chuột trên liên kết để tải xuống
      link.click();

      // Xóa liên kết sau khi tải xuống
      document.body.removeChild(link);
    });
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      {/* success */}
      {setSuccessMess}
      {/* success */}

      <div id="FormBabyAdmin">
        <div className="FormBabyAdmin">
          <div className="FormBabyAdmin1">
            <h3>
              Nhập hóa đơn
            </h3>
            <Form
              name="formAdd"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                margin: 10,
                width: "100%",
              }}
              initialValues={{
                remember: true,
              }}
              form={form}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* số lượng khách */}
              <Form.Item
                label="Số lượng khách hàng"
                name="quantityuser"
                rules={[
                  {
                    required: false,
                    message: "Vui lòng nhập thông tin",
                  },
                ]}
              >
                <InputNumber
                  name="numCustomer"
                  type="number"
                  size="large"
                  min={1}
                  max={100000}
                  defaultValue={1}
                  value={valueQuantityUser}
                  onChange={quantityUser}
                />
              </Form.Item>
              {/* họ tên */}
              <Form.Item
                label="Họ tên khách hàng"
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* tên của hàng  */}
              <Form.Item
                label="Tên cửa hàng"
                name="storeName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn cửa hàng"
                  optionFilterProp="store"
                  onChange={onChangeSelectStore}
                  onSearch={onSearchStore}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "Đỉnh Gió Coffee",
                      label: "Đỉnh Gió Coffee",
                    }, {
                      value: "Cloud Forest",
                      label: "Cloud Forest",
                    }
                  ]}
                />
              </Form.Item>
              {/* đồ uống */}
              <Form.Item
                label="Chọn đồ uống"
                name="drinks"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn đồ uống"
                  onChange={handleDrinkChange}
                  value={selectedDrinks}
                >
                  {renderDrinkOptions()}
                </Select>
              </Form.Item>

              {selectedDrinks.map((drink) => (
                <Form.Item
                  labelCol={{ span: 10 }}
                  key={drink}
                  label={`Số lượng ${drink}: `}
                  name={`quantity_${drink}`}
                  rules={[{ required: true, message: "Please enter quantity" }]}
                >
                  <InputNumber min={1} />
                </Form.Item>
              ))}
              <Form.Item>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button type="primary" htmlType="submit">
                    Thêm hóa đơn
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="printVoucher">
          <div className="bgImg" id="bgImgPrint">
            <div id="myDiv" className="imgVoucher">
              <div className="codeNew">{codeNew ? codeNew.billID : ""}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" onClick={captureAndSaveImage}>
              In Voucher
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(FormBabyAdmin);
