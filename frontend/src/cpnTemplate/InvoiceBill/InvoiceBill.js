import React, { memo, useState, useEffect } from "react";
import "./InvoiceBill.scss";
import axios from "axios";
import imgCoffe from "../../asset/image/invoice.jpg";
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
    updatedDrinks?.forEach((element) => {
      sum += element.price * element.quantity;
    });
    setSumMonney(sum);
  }, [props.billData]);
  let discount = 0;
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
  }, []);
  const drinkNamesArr1 = props.billData?.drinks?.map((item) => item);
  const drinkNamesArr2 = drinks?.map((item) => item);
  const duplicateNames = drinkNamesArr2?.filter((item2) =>
    drinkNamesArr1.some((item1) => item1.drink === item2.name)
  );
  const updatedDrinks = props.billData?.drinks?.map((drink, index) => {
    const duplicateDrink = duplicateNames.find(
      (item) => item.name === drink.drink
    );
    if (duplicateDrink) {
      return {
        ...drink,
        price: duplicateDrink.price, // Thay đổi giá thành giá từ mảng duplicateNames
      };
    }
    return drink;
  });
  console.log(updatedDrinks);
  return (
    <div id="invoice">
      <img className="imgCoffe" src={imgCoffe} alt="logo menu" />
      <div className="header fontPaytone14 textCenter dateBill absolute">
        {formattedDateTime !== "NaN-NaN-NaN NaN:NaN" ? formattedDateTime : ""}
      </div>
      <p className="fontRobo16 absolute codeBill">{props.billData.billID}</p>
      <p className="fontRobo16 absolute nameUser">
        {props.billData.customerName}
      </p>
      <p className="fontRobo16 absolute totalUser">
        {props.billData.numCustomer}
      </p>
      <div className="scrollable-table">
        <table className="absolute table">
          <tr>
            <th className=" MyTikTok1 navDrinkChild">ĐỒ UỐNG</th>
            <th className="MyTikTok1">GIÁ</th>
            <th className="MyTikTok1">SỐ LƯỢNG</th>
            <th className=" MyTikTok1 ">TỔNG</th>
          </tr>
        
              {updatedDrinks?.map((drink, index) => (
                <tr className="InfoDrinkChild" key={drink._id}>
                  <td className="MyTikTok3 drinkChild">{drink.drink}</td>
                  <td className="MyTikTok3 priceChild">${drink.price}</td>
                  <td className="MyTikTok3 textCenter quantityChild">
                    {drink.quantity}
                  </td>
                  <td className="MyTikTok3 textCenter totalChild">
                    ${drink.quantity * drink.price}
                  </td>
                </tr>
              ))}
           
        
        </table>
      </div>
      <div className="totalPay absolute">
        <div className="SumPay ">
          <tr>
            <td className="MyTikTok1">PHỤ PHÍ</td>
            <td className="MyTikTok3 textCenter">${sumMonney}</td>
          </tr>
          <tr>
            <td className="MyTikTok1">GIẢM GIÁ</td>
            <td className="MyTikTok3 textCenter">-${discount}</td>
          </tr>
          <tr>
            <td className="MyTikTok1">TỔNG TIỀN</td>
            <td className="MyTikTok1 textCenter">${sumMonney - discount}</td>
          </tr>
        </div>
      </div>
    </div>
  );
}
export default memo(InvoiceBill);
