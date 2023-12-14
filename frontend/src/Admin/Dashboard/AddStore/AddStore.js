import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddStore.scss";
import NavChildAdmin from "../../navAmin/NavChildAdmin/NavChildAdmin";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
// const originData = [];
// for (let i = 0; i < 10; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
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
        store: inputStoreValue,
        // Thêm các trường dữ liệu khác tùy ý
      };

      const response = await axios.post(
        "https://qrcodeweb-api.vercel.app/api/stores",
        data
      );
      setGetStores(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const [form] = Form.useForm();
  const [data, setData] = useState(getStores);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "TÊN CỬA HÀNG",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "HOẠT ĐỘNG",
      width: "30%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
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
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
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
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
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
