import React, { useState } from 'react';

const DrinkItem = ({ drink, onUpdatePrice }) => {
  const [newPrice, setNewPrice] = useState(drink.price);

  const handlePriceChange = () => {
    onUpdatePrice(drink._id, newPrice);
  };

  return (
    <li key={drink._id}>
      <h3>{drink.name}</h3>
      <p>Price: {drink.price}</p>
      <input
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button onClick={handlePriceChange}>Update Price</button>
    </li>
  );
};

export default DrinkItem;