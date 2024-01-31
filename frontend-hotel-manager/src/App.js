import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './components/Rooms';
import AddRoomForm from './components/AddRoom';
import Header from './components/Header';
import General from './components/General'
import Noti from './components/Noti'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/room-management" element={<Rooms />} />
          <Route path="/add-room" element={<AddRoomForm />} />
          <Route path="/noti" element={<Noti/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
