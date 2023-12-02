import React, { memo, useState, useEffect } from "react";
import "./InvoiceBill.scss";
import imgCoffe from "../../asset/image/coffe.jpg";
function InvoiceBill(props) {
  // format date
  const date = new Date(props.billData.createdAt);
  const year = date.getFullYear(); // Năm, ví dụ: 2023
  const month = date.getMonth() + 1; // Tháng (từ 0 đến 11), cần cộng thêm 1, ví dụ: 11
  const day = date.getDate(); // Ngày, ví dụ: 29
  const hours = date.getHours(); // Giờ, ví dụ: 19
  const minutes = date.getMinutes(); // Phút, ví dụ: 8

  // Định dạng chuỗi ngày tháng giờ phút
  const formattedDateTime = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  const [sumMonney, setSumMonney] = useState();
  useEffect(() => {
    let sum = 0;
    props.billData?.drinks?.forEach((element) => {
      sum += element.price * element.quantity;
    });
    setSumMonney(sum);
  }, [props.billData]);
  let discount = 0;
  return (
    <div id="invoice">
      <img className="imgCoffe" src={imgCoffe} alt="logo menu" />
      <div className="infomationBill">
        <div
          className="header fontRobo32 textCenter"
          style={{ lineHeight: "50px", color: "#512D14" }}
        >
          Hóa đơn
        </div>
        <div
          className="header fontPaytone14 textCenter"
          style={{ marginBottom: "15px" }}
        >
          Ngày: {formattedDateTime !=='NaN-NaN-NaN NaN:NaN'? formattedDateTime :''}
        </div>
        <div className="informationHoaDon">
          <tr>
            <td className="fontRobo16">MÃ HÓA ĐƠN:</td>
            <td className="fontRobo16">{props.billData.billID}</td>
          </tr>
          <tr>
            <td className="fontRobo16">TÊN KHÁCH HÀNG</td>
            <td className="fontRobo16">{props.billData.customerName}</td>
          </tr>
          <tr>
            <td className="fontRobo16">SỐ LƯỢNG NGƯỜI</td>
            <td className="fontRobo16">{props.billData.numCustomer}</td>
          </tr>
          <div
            className="line"
            style={{ marginLeft: "5px", marginTop: "5px" }}
          ></div>
        </div>
        <table>
          <tr>
            <th className="fontPaytone14 ">STT</th>
            <th className="fontPaytone14 ">Đồ uống</th>
            <th className="fontPaytone14 parallelogram">Số lượng</th>
            <th className="fontPaytone14 parallelogram">Giá</th>
            <th className="fontPaytone14 ">Tổng</th>
          </tr>
          {props.billData?.drinks?.map((drink, index) => (
            <tr className="InfoDrinkChild" key={index}>
              <td className="fontRobo14 textCenter">{index + 1}</td>
              <td className="fontRobo14 textCenter">{drink.drink}</td>
              <td className="fontRobo14 textCenter">{drink.quantity}</td>
              <td className="fontRobo14 textCenter">{drink.price}</td>
              <td className="fontRobo14 textCenter">
                {drink.quantity * drink.price}
              </td>
            </tr>
          ))}
        </table>
        <div className="SumPay">
          <tr>
            <td className="fontPaytone16">Tổng tiền</td>
            <td className="fontRobo14 textCenter">{sumMonney}</td>
          </tr>
          <tr>
            <td className="fontPaytone16">Giảm giá</td>
            <td className="fontRobo14 textCenter">{discount}</td>
          </tr>
          <tr>
            <td className="fontPaytone16">Tổng cộng</td>
            <td className="fontRobo14 textCenter">{sumMonney - discount}</td>
          </tr>
        </div>
        <div className="fontPaytone16 textCenter mgt40">
          Cảm ơn quý khách đã sử dụng dịch vụ
        </div>
      </div>
    </div>
  );
}
export default memo(InvoiceBill);
