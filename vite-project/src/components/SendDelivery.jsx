import React, { useState, useEffect } from "react";
import axios from "axios";
import QRScanner from "../components/Qr_Scanner.jsx";
// import '../styles.css'; // Import the CSS file

const SendDelivery = () => {
  const [trucks, setTrucks] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [cap, setCap] = useState(0);
  const [pin, setPin] = useState("");
  const [showQRScanner, setShowQRScanner] = useState(false); // State for showing QR Scanner

  useEffect(() => {
    // Fetch available trucks and items from the backend
    const fetchData = async () => {
      try {
        const trucksResponse = await axios.get("http://localhost:5000/trucks");
        const itemsResponse = await axios.get("http://localhost:5000/items");
        setTrucks(trucksResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleItemSelection = (e, item) => {
    const value = e.target.value;
    const itemCapacity = Number(item.capacity);

    if (e.target.checked) {
      // Add item and increase capacity
      setSelectedItems((prev) => [
        ...prev,
        { item_id: value, name: item.name, quantity: 1 },
      ]);
      setCap((prevCap) => prevCap + itemCapacity);
    } else {
      // Remove item and decrease capacity
      setSelectedItems((prev) => prev.filter((i) => i.item_id !== value));
      setCap((prevCap) => prevCap - itemCapacity);
    }
  };

  const toggleSideTab = () => {
    setIsSideTabCollapsed((prev) => !prev); // Toggle state
  };

  const handleQRScanSuccess = (result) => {
    setSelectedTruck(result); // Assuming the result is the truck ID
    setShowQRScanner(false); // Hide QR scanner after a successful scan
  };

  const handleSendDelivery = async () => {
    try {
      const deliveryData = {
        delivery_id: `D${Date.now()}`,
        pin: Math.random().toString(36).substring(2, 8).toUpperCase(),
        truck_id: selectedTruck,
        items: selectedItems,
        source: source,
        destination: destination,
        delivery_date: `${Date.now()}`,
      };
      await axios.post("http://localhost:5000/deliveries", deliveryData);
      setPin(deliveryData.pin);
    } catch (error) {
      console.error("Error sending delivery:", error);
    }
  };

  const availableTrucks = trucks.filter(
    (truck) => truck.status === "available" && truck.capacity >= cap
  );

  return (
    <div className="container">
      {/* Side Tab */}
      <main id="main-content">
        <section id="send" className="section tab-content active">
          <h2>Send Trucks</h2>

          {/* QR Scanner Trigger */}
          <div className="scanner">
            <label htmlFor="send-truck-qr">Scan Truck QR:</label>
            <button
              className="confirm-btn"
              onClick={() => setShowQRScanner(true)}
            >
              Open QR Scanner
            </button>
            {showQRScanner && <QRScanner onSuccess={handleQRScanSuccess} />}
          </div>

          <div className="truck-details">
            <h3>Truck Details</h3>
            <p>
              Truck ID: <span id="send-truck-id">{selectedTruck || " "}</span>
            </p>
            <p>
              Destination Warehouse:{" "}
              <span id="send-destination">Warehouse A</span>
            </p>
          </div>

          <div className="items-list">
            <h3>Items in Truck</h3>
            <ul>
              {selectedItems.map((item) => (
                <li key={item.item_id}>{item.name}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Select Truck:</label>
            <select
              className="border border-gray-300 bg-white p-2 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setSelectedTruck(e.target.value)}
              value={selectedTruck}
            >
              <option value="">Select a truck</option>
              {availableTrucks.map((truck) => (
                <option key={truck._id} value={truck._id}>
                  {truck.vehicle_number}
                </option>
              ))}
            </select>
          </div>

          <div className=" mb-4">
            <label className="block mb-2 ">Select Source:</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="border  border-gray-300 bg-white p-2 mb-2"
            />
            <label className="block mb-2">Select Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border  border-gray-300 bg-white  p-2 mb-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Select Items:</label>
            {items.map((item) => (
              <div key={item.item_id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={item.item_id}
                  onChange={(e) => handleItemSelection(e, item)}
                />
                <span className="ml-2">{item.name}</span>
              </div>
            ))}
          </div>

          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSendDelivery}
            disabled={!selectedTruck || selectedItems.length === 0}
          >
            Send Delivery
          </button>
          {pin && <p className="mt-4">Delivery PIN: {pin}</p>}
        </section>
      </main>
    </div>
  );
};

export default SendDelivery;
