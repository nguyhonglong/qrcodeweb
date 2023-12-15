import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddStore.scss";
import NavChildAdmin from "../../navAmin/NavChildAdmin/NavChildAdmin";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
  message,
} from "antd";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Hãy nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
function AddStore() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const [successMess, setSuccessMess] = message.useMessage();
  // get data Store
  const [getStores, setGetStores] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://qrcodeweb-api.vercel.app/api/stores"
        );
        setGetStores(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchData();
  }, []);

  const [inputStoreValue, setInputStoreValue] = useState("");
  //  thêm của hàng
  const handleAddStore = async () => {
    try {
      const data = {
        storeName: inputStoreValue,
        // Thêm các trường dữ liệu khác tùy ý
      };

      await axios
        .post("https://qrcodeweb-api.vercel.app/api/stores", data)
        .then(async () => {
          successMess.open({
            type: "success",
            content: "Thêm cửa hàng thành công",
          });
          await axios
            .get("https://qrcodeweb-api.vercel.app/api/stores")
            .then((response) => {
              setGetStores(response.data);
              console.log(response.data);
              setInputStoreValue("");
            });
        })
        .catch((err) => {
          successMess.open({
            type: "error",
            content: "Thêm cửa hàng thất bại",
          });
        });
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record._id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      storeName: "",
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const deleteStore = async (record) => {
    console.log(record.storeName);
    await axios
      .delete(`https://qrcodeweb-api.vercel.app/api/stores/${record.storeName}`)
      .then(() => {
        successMess.open({
          type: "success",
          content: "Xóa cửa hàng thành công",
        });
        setEditingKey("");
      })
      .catch((err) => console.log(err));
  };
  const save = async (key) => {
    console.log(key);
    try {
      // giá trị của row hiện tại
      const row = await form.validateFields();
      const oldValueRow = row;
      console.log(oldValueRow);
      const newData = [...getStores];
      // tìm vị trí của row được nhấn nút save
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        // if (row === "") {
        //   await axios.delete(`https://qrcodeweb-api.vercel.app/api/stores/${}`);
        // }

        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // setGetStores(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setGetStores(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "TÊN CỬA HÀNG",
      dataIndex: "storeName",
      key: "storeName",
      editable: true,
    },
    {
      title: "THỜI GIAN TẠO",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDate(text),
      width: "20%",
    },
    {
      title: "HOẠT ĐỘNG",
      width: "20%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <Typography.Link onClick={() => save(record._id)}>
                Save
              </Typography.Link>
              <br></br>
              <Typography.Text
                type="danger"
                onClick={() => deleteStore(record)}
              >
                Delete
              </Typography.Text>
            </div>
            <div>
              <Typography.Text type="warning" onClick={cancel}>
                Cancel
              </Typography.Text>
            </div>
          </div>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {/* success */}
      {setSuccessMess}
      {/* success */}
      <div id="AddStore">
        <NavChildAdmin />
        <h3 className="title">Quản lý cửa hàng</h3>
        <Form
          form={form}
          component={false}
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              maxWidth: "800px",
            }}
          >
            <Input
              size="middle"
              value={inputStoreValue}
              onChange={(e) => setInputStoreValue(e.target.value)}
            />
            <Button onClick={handleAddStore}>Thêm cửa hàng</Button>
          </div>
          <Table
            style={{ maxWidth: "800px", margin: "0 auto" }}
            className="table"
            scroll={{
              x: 600,
              y: 400,
            }}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={getStores}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </>
  );
}

export default AddStore;
