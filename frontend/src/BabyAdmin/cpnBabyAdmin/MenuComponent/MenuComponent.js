// import React, { useEffect, useState } from "react";
// import NavBar from "../../../components/NavBar/NavBar";
// import "./MenuComponent.scss";
// const MenuComponent = () => {
//   const [menu, setMenu] = useState([]);
//   const [newItemName, setNewItemName] = useState("");
//   const [newItemPrice, setNewItemPrice] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5555/api/drinks")
//       .then((response) => response.json())
//       .then((data) => setMenu(data))
//       .catch((error) => console.log(error));
//   }, []);

//   const handlePriceChange = (itemId, newPrice) => {
//     fetch(`http://:localhost:5555/api/drinks/${itemId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ price: newPrice }),
//     })
//       .then((response) => response.json())
//       .then((updatedItem) => {
//         setMenu((prevMenu) =>
//           prevMenu.map((item) =>
//             item._id === updatedItem._id
//               ? { ...item, price: updatedItem.price }
//               : item
//           )
//         );
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleNameChange = (itemId, newName) => {
//     fetch(`http://localhost:5555/api/drinks/${itemId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: newName }),
//     })
//       .then((response) => response.json())
//       .then((updatedItem) => {
//         setMenu((prevMenu) =>
//           prevMenu.map((item) =>
//             item._id === updatedItem._id
//               ? { ...item, name: updatedItem.name }
//               : item
//           )
//         );
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleDeleteItem = (itemId) => {
//     fetch(`http://localhost:5555/api/drinks/${itemId}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setMenu((prevMenu) => prevMenu.filter((item) => item._id !== itemId));
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleAddItem = () => {
//     fetch("http://localhost:5555/api/drinks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: newItemName, price: newItemPrice }),
//     })
//       .then((response) => response.json())
//       .then((newItem) => {
//         setMenu((prevMenu) => [...prevMenu, newItem]);
//         setNewItemName("");
//         setNewItemPrice("");
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div id="MenuComponent">
//       <NavBar />
//       <h1>Menu</h1>
//       <div className="flexCenter">
//         <ul className="EditDrink">
//           {menu.map((item) => (
//             <div className="boder">
//             <li className="Drink" key={item._id}>
//               <div  className="flex">
//               <h5>{item.name}</h5>
//               <p>Price: {item.price}</p>
//               </div>
//               <input
//                 type="number"
//                 value={item.price}
//                 onChange={(e) => handlePriceChange(item._id, e.target.value)}
//               />
//               <input
//                 type="text"
//                 value={item.name}
//                 onChange={(e) => handleNameChange(item._id, e.target.value)}
//               />
//               <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
//             </li>
//             </div>
//           ))}
//         </ul>
//       </div>
//       <div className="addNewItem">
//         <h3>Add New Item</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newItemName}
//           onChange={(e) => setNewItemName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newItemPrice}
//           onChange={(e) => setNewItemPrice(e.target.value)}
//         />

//         <button onClick={handleAddItem}>Add</button>
//       </div>
//     </div>
//   );
// };

// export default MenuComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function DrinkComponent() {
//   const [drinks, setDrinks] = useState([]);
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [selectedDrinkId, setSelectedDrinkId] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://qrcodeweb-api.vercel.app/api/drinks'); // Thay đổi URL phù hợp
//       setDrinks(response.data);
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     }
//   };

//   const addDrink = async () => {
//     try {
//       const response = await axios.post('https://qrcodeweb-api.vercel.app/api/drinks', { name, price }); // Thay đổi URL phù hợp
//       setDrinks([...drinks, response.data]);
//       setName('');
//       setPrice('');
//     } catch (error) {
//       console.error('Error adding drink: ', error);
//     }
//   };

//   const updateDrink = async () => {
//     try {
//       if (!selectedDrinkId) {
//         return;
//       }

//       await axios.patch(`https://qrcodeweb-api.vercel.app/api/drinks/${selectedDrinkId}`, { name, price }); // Thay đổi URL phù hợp
//       fetchData();
//       setName('');
//       setPrice('');
//       setSelectedDrinkId(null);
//     } catch (error) {
//       console.error('Error updating drink: ', error);
//     }
//   };

//   const deleteDrink = async (id) => {
//     try {
//       await axios.delete(`https://qrcodeweb-api.vercel.app/api/drinks/${id}`); // Thay đổi URL phù hợp
//       fetchData();
//     } catch (error) {
//       console.error('Error deleting drink: ', error);
//     }
//   };

//   const selectDrink = (id, name, price) => {
//     setSelectedDrinkId(id);
//     setName(name);
//     setPrice(price);
//   };

//   return (
//     <div>
//       <h2>Drinks</h2>
//       <ul>
//         {drinks.map((drink) => (
//           <li key={drink._id}>
//             {drink.name} - {drink.price}
//             <button onClick={() => selectDrink(drink._id, drink.name, drink.price)}>Edit</button>
//             <button onClick={() => deleteDrink(drink._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       {selectedDrinkId ? (
//         <button onClick={updateDrink}>Update</button>
//       ) : (
//         <button onClick={addDrink}>Add Drink</button>
//       )}
//     </div>
//   );
// }

// export default DrinkComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  NavBar from '../../../components/NavBar/NavBar' 
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
    <div>
        <NavBar/>
      <h2>Drinks</h2>
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
    </div>
  );
}

export default DrinkComponent;
