import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const ReceiveDelivery = () => {
  const [pin, setPin] = useState('');
  const [delivery, setDelivery] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [itemQRCode, setItemQRCode] = useState('');

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

  const markItemAsReceived = (itemId) => {
    console.log(`Item ${itemId} marked as received`);
    // Optionally update the checkedItems state here if needed
    setCheckedItems(prev => 
      prev.map(item => 
        item.item_id === itemId ? { ...item, checked: true } : item
      )
    );
  };

  return (
    <div className="container p-4">
      <h1 className="text-xl font-bold mb-4">Receive Delivery</h1>
      <div className="mb-4 p-2">
        <label className="block mb-4"> Enter PIN:</label>
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

      <section id="receive" className="section tab-content">
        <h2>Receive Trucks</h2>
        <div className="scanner">
          <label htmlFor="receive-truck-qr">Scan Truck QR:</label>
          <input type="text" id="receive-truck-qr" placeholder="Scan Truck QR code" />
        </div>
        <div className="truck-details">
          <h3>Truck Details</h3>
          <p>Truck ID: <span id="receive-truck-id">67890</span></p>
          <p>Source Warehouse: <span id="receive-source">Warehouse B</span></p>
        </div>
        <div className="items-list">
          <div className="item-scanner">
            <h3>Scan Item QR Code</h3>
            <label htmlFor="item-qr-code">Item QR Code:</label>
            <input
              type="text"
              id="item-qr-code"
              placeholder="Scan Item QR code"
              value={itemQRCode}
              onChange={(e) => setItemQRCode(e.target.value)}
            />
            <button onClick={() => markItemAsReceived(itemQRCode)}>Mark as Received</button>
          </div>
          <h3>Items in Truck</h3>
          <ul id="receive-items-list">
            {checkedItems.map(item => (
              <li key={item.item_id}>
                <input
                  type="checkbox"
                  id={`item-${item.item_id}`}
                  checked={item.checked}
                  onChange={(e) => {
                    setCheckedItems(prev => 
                      prev.map(i => i.item_id === item.item_id ? { ...i, checked: e.target.checked } : i)
                    );
                  }}
                />
                <label htmlFor={`item-${item.item_id}`}>{item.name}</label>
                <span className="status">{item.checked ? 'Received' : 'Pending'}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded mt-4"
          onClick={handleCompleteDelivery}
        >
          Complete Delivery
        </button>
      </section>
    </div>
  );
};

export default ReceiveDelivery;
