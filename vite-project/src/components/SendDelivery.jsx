import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendDelivery = () => {
  const [trucks, setTrucks] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [pin, setPin] = useState('');

  useEffect(() => {
    // Fetch available trucks and items from the backend
    const fetchData = async () => {
      try {
        const trucksResponse = await axios.get('http://localhost:5000/trucks');
        console.log(trucksResponse.data);
        const itemsResponse = await axios.get('http://localhost:5000/items');
        console.log(itemsResponse.data);
        setTrucks(trucksResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSendDelivery = async () => {
    try {
      const deliveryData = {
        delivery_id: `D${Date.now()}`,
        pin: Math.random().toString(36).substring(2, 8).toUpperCase(),
        truck_id: selectedTruck,
        items: selectedItems,
      };
      await axios.post('http://localhost:5000/deliveries', deliveryData);
      setPin(deliveryData.pin);
    } catch (error) {
      console.error('Error sending delivery:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Send Delivery</h1>
      <div className="mb-4">
        <label className="block mb-2">Select Truck:</label>
        <select
          className="border p-2"
          onChange={(e) => setSelectedTruck(e.target.value)}
          value={selectedTruck}
        >
          <option value="">Select a truck</option>
          {trucks.filter(truck => truck.status === 'available').map(truck => (
            <option key={truck._id} value={truck._id}>{truck.vehicle_number}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Items:</label>
        {items.map(item => (
          <div key={item.item_id} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={item.item_id}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedItems(prev => e.target.checked ? [...prev, { item_id: value, name: item.name, quantity: 1 }] : prev.filter(i => i.item_id !== value));
              }}
            />
            <span className="ml-2">{item.name}</span>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSendDelivery}
      >
        Send Delivery
      </button>
      {pin && <p className="mt-4">Delivery PIN: {pin}</p>}
    </div>
  );
};

export default SendDelivery;
