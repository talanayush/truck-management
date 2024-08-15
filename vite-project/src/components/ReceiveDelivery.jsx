import React, { useState } from 'react';
import axios from 'axios';

const ReceiveDelivery = () => {
  const [pin, setPin] = useState('');
  const [delivery, setDelivery] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleFetchDelivery = async () => {
    try {
      console.log(pin);
      const response = await axios.get(`http://localhost:5000/deliveries/${pin}`);
      setDelivery(response.data);
      setCheckedItems(response.data.items.map(item => ({ ...item, checked: false })));
    } catch (error) {
      console.error('Error fetching delivery:', error);
    }
  };

  const handleCompleteDelivery = async () => {
    try {
      await axios.delete(`http://localhost:5000/deliveries/${pin}`);
      alert('Delivery completed!');
    } catch (error) {
      console.error('Error completing delivery:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Receive Delivery</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter PIN:</label>
        <input
          type="text"
          className="border p-2"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2"
          onClick={handleFetchDelivery}
        >
          Fetch Delivery
        </button>
      </div>
      {delivery && (
        <div>
          <h2 className="text-lg font-bold mb-2">Delivery Items</h2>
          {delivery.items.map(item => (
            <div key={item.item_id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={checkedItems.find(i => i.item_id === item.item_id)?.checked || false}
                onChange={(e) => {
                  setCheckedItems(prev => prev.map(i => i.item_id === item.item_id ? { ...i, checked: e.target.checked } : i));
                }}
              />
              <span className="ml-2">{item.name}</span>
            </div>
          ))}
          <button
            className="bg-green-500 text-white p-2 rounded mt-4"
            onClick={handleCompleteDelivery}
          >
            Complete Delivery
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceiveDelivery;
