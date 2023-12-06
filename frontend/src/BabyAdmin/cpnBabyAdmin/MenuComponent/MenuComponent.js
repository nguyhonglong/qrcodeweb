import React, { useEffect, useState } from 'react';

const MenuComponent = () => {
  const [menu, setMenu] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  useEffect(() => {
    fetch('http://localhost:5555/api/drinks')
      .then(response => response.json())
      .then(data => setMenu(data))
      .catch(error => console.log(error));
  }, []);

  const handlePriceChange = (itemId, newPrice) => {
    fetch(`http://:localhost:5555/api/drinks/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then(response => response.json())
      .then(updatedItem => {
        setMenu(prevMenu =>
          prevMenu.map(item =>
            item._id === updatedItem._id ? { ...item, price: updatedItem.price } : item
          )
        );
      })
      .catch(error => console.log(error));
  };

  const handleNameChange = (itemId, newName) => {
    fetch(`http://localhost:5555/api/drinks/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    })
      .then(response => response.json())
      .then(updatedItem => {
        setMenu(prevMenu =>
          prevMenu.map(item =>
            item._id === updatedItem._id ? { ...item, name: updatedItem.name } : item
          )
        );
      })
      .catch(error => console.log(error));
  };

  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:5555/api/drinks/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setMenu(prevMenu => prevMenu.filter(item => item._id !== itemId));
      })
      .catch(error => console.log(error));
  };

  const handleAddItem = () => {
    fetch('http://localhost:5555/api/drinks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newItemName, price: newItemPrice })
    })
      .then(response => response.json())
      .then(newItem => {
        setMenu(prevMenu => [...prevMenu, newItem]);
        setNewItemName('');
        setNewItemPrice('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menu.map(item => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <input
              type="number"
              value={item.price}
              onChange={e => handlePriceChange(item._id, e.target.value)}
            />
            <input
              type="text"
              value={item.name}
              onChange={e => handleNameChange(item._id, e.target.value)}
            />
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItemPrice}
          onChange={e => setNewItemPrice(e.target.value)}
        />
        
        <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
};

export default MenuComponent;