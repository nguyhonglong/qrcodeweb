import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Container, Row, Col, Pagination } from 'react-bootstrap';

const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingRow, setEditingRow] = useState(null);
  const [status] = useState([
    { id: 1, name: 'Room 1', status: 'Có sẵn' },
    { id: 2, name: 'Room 2', status: 'Đang cho thuê' },
    { id: 3, name: 'Room 3', status: 'pending' }
  ]);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Có sẵn':
        return 'success';
      case 'Đang cho thuê':
        return 'warning';
      case 'Đang xử lý':
        return 'info';
      case 'Cancelled':
        return 'danger';
      default:
        return 'light';
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('https://qrcodeweb-api.vercel.app/hotels');
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const searchRooms = () => {
      const filteredData = rooms.filter((room) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
          room.homestayName.toLowerCase().includes(searchTermLowerCase) ||
          room.roomCode.toLowerCase().includes(searchTermLowerCase) ||
          room.renter.toLowerCase().includes(searchTermLowerCase)
          // Thêm các trường dữ liệu khác cần tìm kiếm ở đây
        );
      });
      setFilteredRooms(filteredData);
    };

    searchRooms();
  }, [rooms, searchTerm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN') + " " + date.toLocaleTimeString('vn-VN');
  };

  // Tính toán index của các phần tử trên trang hiện tại
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms
    .slice(indexOfFirstRoom, indexOfLastRoom)
    .sort((a, b) => {
      if (sortColumn) {
        // Nếu có cột đang được sắp xếp
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (sortDirection === 'asc') {
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
          } else {
            return aValue - bValue;
          }
        } else {
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return bValue.localeCompare(aValue);
          } else {
            return bValue - aValue;
          }
        }
      }
      return 0;
    });
  // Xử lý sự kiện khi chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Nếu cột đang được sắp xếp, đảo ngược hướng sắp xếp
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Nếu chọn một cột mới, đặt cột mới và hướng sắp xếp là mặc định
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="searchForm">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm theo tên homestay, mã phòng, hoặc người thuê,.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSort('homestayName')}>
                  Homestay Name
                  {sortColumn === 'homestayName' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th onClick={() => handleSort('roomCode')}>
                  Mã Phòng
                  {sortColumn === 'roomCode' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                
                <th onClick={() => handleSort('checkInDate')}>
                  Ngày Check-in
                  {sortColumn === 'checkInDate' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th onClick={() => handleSort('checkOutDate')}>
                  Ngày check-out
                  {sortColumn === 'checkOutDate' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th onClick={() => handleSort('status')}>
                  Trạng thái
                  {sortColumn === 'status' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th onClick={() => handleSort('rentalPrice')}>
                  Giá nhập phòng
                  {sortColumn === 'rentalPrice' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th onClick={() => handleSort('renter')}>
                  Người nhập phòng
                  {sortColumn === 'renter' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th onClick={() => handleSort('renter')}>
                  Giá phòng
                  {sortColumn === 'renter' && (
                    <span className={`ml-2 ${sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}`} />
                  )}
                </th>
                <th>Người cho thuê</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room._id} className={`table-${getStatusColor(room.status)}`}>
                  <td>{room.homestayName}</td>
                  <td>{room.roomCode}</td>
                  <td>{formatDate(room.checkInDate)}</td>
                  <td>{formatDate(room.checkOutDate)}</td>
                  <td>{room.status}</td>
                  <td>{room.rentalPrice}</td>
                  <td>{room.renter}</td>
                  <td>{room.checkInPrice.normalDay}</td>
                  <td>{room.checkInStaff}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>
            {Array(Math.ceil(filteredRooms.length / roomsPerPage))
              .fill()
              .map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default RoomTable;