import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand href="#home">Quản lý Phòng Tà Xùa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Tổng quan</Nav.Link>
          <Nav.Link href="/room-management">Quản lý phòng</Nav.Link>
          <Nav.Link href="/add-room">Thêm phòng</Nav.Link>
          <Nav.Link href="/noti">Thông báo</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;