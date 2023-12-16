import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../../components/NavBar/NavBar'
import "./MenuComponent.scss"
import { Row, Col, List, Button, Input } from 'antd';

function DrinkComponent() {
  const [drinks, setDrinks] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [selectedDrinkId, setSelectedDrinkId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://qrcodeweb-api.vercel.app/api/drinks'); // Thay đổi URL phù hợp
      setDrinks(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const addDrink = async () => {
    try {
      const response = await axios.post('https://qrcodeweb-api.vercel.app/api/drinks', formData); // Thay đổi URL phù hợp
      setDrinks([...drinks, response.data]);
      setFormData({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding drink: ', error);
    }
  };

  const updateDrink = async () => {
    try {
      if (!selectedDrinkId) {
        return;
      }

      await axios.patch(`https://qrcodeweb-api.vercel.app/api/drinks/${selectedDrinkId}`, formData); // Thay đổi URL phù hợp
      fetchData();
      setFormData({ name: '', price: '' });
      setSelectedDrinkId(null);
    } catch (error) {
      console.error('Error updating drink: ', error);
    }
  };

  const deleteDrink = async (id) => {
    try {
      await axios.delete(`https://qrcodeweb-api.vercel.app/api/drinks/${id}`); // Thay đổi URL phù hợp
      fetchData();
    } catch (error) {
      console.error('Error deleting drink: ', error);
    }
  };

  const selectDrink = (id, name, price) => {
    setSelectedDrinkId(id);
    setFormData({ name, price });
  };


  return (
    <div id='MenuCpn'>
      <NavBar />


      <div className='drinks'>
        <h2 style={{margin:'30px 0 20px 20px'}}>Quản lý đồ uống</h2>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <List
              bordered
              dataSource={drinks.slice(0, Math.ceil(drinks.length / 2))}
              renderItem={(drink) => (
                <List.Item className="border-bottom text-primary">
                  {drink.name} - {drink.price}
                  <Button onClick={() => selectDrink(drink._id, drink.name, drink.price)}>Edit</Button>
                  <Button onClick={() => deleteDrink(drink._id)}>Delete</Button>
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <List
              bordered
              dataSource={drinks.slice(Math.ceil(drinks.length / 2))}
              renderItem={(drink) => (
                <List.Item className="border-bottom text-primary">
                  {drink.name} - {drink.price}
                  <Button onClick={() => selectDrink(drink._id, drink.name, drink.price)}>Edit</Button>
                  <Button onClick={() => deleteDrink(drink._id)}>Delete</Button>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (selectedDrinkId) {
            updateDrink();
          } else {
            addDrink();
          }
        }}>
          <Input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          {selectedDrinkId ? (
            <Button type="primary" htmlType="submit">Update</Button>
          ) : (
            <Button type="primary" htmlType="submit">Add Drink</Button>
          )}
        </form>
      </div>
      {/* <div className='drinks'>
        <h2>Quản lý đồ uống</h2>
        <ul>
          {drinks.map((drink) => (
            <li key={drink._id}>
              {drink.name} - {drink.price}
              <button onClick={() => selectDrink(drink._id, drink.name, drink.price)}>Edit</button>
              <button onClick={() => deleteDrink(drink._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (selectedDrinkId) {
            updateDrink();
          } else {
            addDrink();
          }
        }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          {selectedDrinkId ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Add Drink</button>
          )}
        </form>
      </div> */}
    </div>

  );
}

export default DrinkComponent;
