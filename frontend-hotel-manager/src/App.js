import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './components/Rooms';
import AddRoomForm from './components/AddRoom';
import Header from './components/Header';
import General from './components/General'
import Noti from './components/Noti'
import Footer from './components/Footer';
import People from './components/People';
import Income from './components/Income';


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
          <Route path="/people" element={<Income/>} />
          <Route path="/income" element={<People/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
