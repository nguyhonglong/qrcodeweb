import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LatestRoomsList = () => {
  const [latestRooms, setLatestRooms] = useState([]);

  useEffect(() => {
    const fetchLatestRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/hotels');
        const roomsData = response.data;
        setLatestRooms(roomsData.reverse());
      } catch (error) {
        console.error('An error occurred while fetching the latest rooms:', error);
      }
    };

    fetchLatestRooms();
  }, []);

  return (
    <div className="latest-rooms-list">
      {latestRooms.length === 0 ? (
        <div className="alert alert-info">Loading...</div>
      ) : (
        <ul className="list-group">
          {latestRooms.map((room) => (
            <li key={room._id} className="list-group-item">
              <p className="alert alert-success">
                Thông báo: {room.renter} đã nhập thêm phòng {room.roomCode} vào lúc {room.checkInDate}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestRoomsList;