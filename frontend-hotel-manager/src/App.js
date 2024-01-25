import React, { Component, useState } from 'react'
import Rooms from './components/Rooms';
import axios from 'axios'

function App() {
  return (
    <div className="App">
      <div>
        <Rooms />
      </div>
    </div>
  );
}

export default App;
