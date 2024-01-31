// import React, { useState } from 'react';
// import axios from 'axios';

// function handleDate() {
//   const currentDate = new Date();
//   const formattedDate = new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   }).format(currentDate);
//   return formattedDate;
// }

// const AddRoomForm = () => {
//   const [roomData, setRoomData] = useState({
//     homestayName: '',
//     roomCode: '',
//     checkInDate: handleDate(),
//     checkOutDate: handleDate(),
//     status: 'Có sẵn',
//     rentalPrice: 0,
//     renter: '',
//     checkInPrice: {
//       normalDay: 0,
//       holiday: 0,
//       weekend: 0
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRoomData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(roomData);
//     try {
//       const response = await axios.post('http://localhost:5555/api/hotel', roomData);
//       console.log(response.data);
//       // Xử lý phản hồi thành công theo nhu cầu của bạn
//     } catch (error) {
//       console.error('An error occurred while submitting the form:', error);
//       // Xử lý lỗi nếu có
//     }
//   };

//   return (
//     <form className="container" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="homestayName">Tên Homestay:</label>
//         <input
//           type="text"
//           id="homestayName"
//           name="homestayName"
//           className="form-control"
//           value={roomData.homestayName}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="roomCode">Mã Phòng:</label>
//         <input
//           type="text"
//           id="roomCode"
//           name="roomCode"
//           className="form-control"
//           value={roomData.roomCode}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="rentalPrice">Giá thuê vào:</label>
//         <input
//           type="number"
//           id="rentalPrice"
//           name="rentalPrice"
//           className="form-control"
//           value={roomData.rentalPrice}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="renter">Người thuê:</label>
//         <input
//           type="text"
//           id="renter"
//           name="renter"
//           className="form-control"
//           value={roomData.renter}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="checkInPrice.normalDay">Giá Check-in (Ngày thường):</label>
//         <input
//           type="number"
//           id="checkInPrice.normalDay"
//           name="checkInPrice.normalDay"
//           className="form-control"
//           value={roomData.checkInPrice.normalDay}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="checkInPrice.holiday">Giá Check-in (Ngày lễ):</label>
//         <input
//           type="number"
//           id="checkInPrice.holiday"
//           name="checkInPrice.holiday"
//           className="form-control"
//           value={roomData.checkInPrice.holiday}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="checkInPrice.weekend">Giá Check-in (Ngày cuối tuần):</label>
//         <input
//           type="number"
//           id="checkInPrice.weekend"
//           name="checkInPrice.weekend"
//           className="form-control"
//           value={roomData.checkInPrice.weekend}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">Thêm phòng</button>
//     </form>
//   );
// };

// export default AddRoomForm;

import React, { useState } from 'react';
import axios from 'axios';

const AddRoomForm = () => {
    const [roomData, setRoomData] = useState({
        homestayName: '',
        roomCode: '',
        rentalPrice: 0,
        renter: '',
        checkInPrice: {
            normalDay: 0,
            holiday: 0,
            weekend: 0
        }
    });
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(roomData);
        try {
            const response = await axios.post('https://qrcodeweb-api.vercel.app/api/hotel', roomData);
            console.log(response.data);
            setNotification('Thêm phòng thành công!');
            // Xử lý phản hồi thành công theo nhu cầu của bạn
        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
            setNotification('Đã xảy ra lỗi khi gửi biểu mẫu.');
            // Xử lý lỗi nếu có
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            {notification && <div className="notification">{notification}</div>}
            <div className="form-group">
                <label htmlFor="homestayName">Tên Homestay:</label>
                <input
                    autoFocus
                    type="text"
                    id="homestayName"
                    name="homestayName"
                    className="form-control"
                    value={roomData.homestayName}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="roomCode">Mã Phòng:</label>
                <input
                    type="text"
                    id="roomCode"
                    name="roomCode"
                    className="form-control"
                    value={roomData.roomCode}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="rentalPrice">Giá thuê vào:</label>
                <input
                    type="number"
                    id="rentalPrice"
                    name="rentalPrice"
                    className="form-control"
                    value={roomData.rentalPrice}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="renter">Người thuê:</label>
                <input
                    type="text"
                    id="renter"
                    name="renter"
                    className="form-control"
                    value={roomData.renter}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkInPrice.normalDay">Giá Check-in (Ngày thường):</label>
                <input
                    type="number"
                    id="checkInPrice.normalDay"
                    name="checkInPrice.normalDay"
                    className="form-control"
                    value={roomData.checkInPrice.normalDay}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkInPrice.holiday">Giá Check-in (Ngày lễ):</label>
                <input
                    type="number"
                    id="checkInPrice.holiday"
                    name="checkInPrice.holiday"
                    className="form-control"
                    value={roomData.checkInPrice.holiday}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkInPrice.weekend">Giá Check-in (Ngày cuối tuần):</label>
                <input
                    type="number"
                    id="checkInPrice.weekend"
                    name="checkInPrice.weekend"
                    className="form-control"
                    value={roomData.checkInPrice.weekend}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Thêm phòng</button>
        </form>
    );
};

export default AddRoomForm;