import React, { useEffect, useState } from 'react';
import axios from 'axios';
import truckImg from '../assets/truck.jpg';
import Modal from '../components/Modal'; // Import the Modal component
import '../styles.css'; // Assuming you have a CSS file for custom styles

const CurrentDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    // Fetch deliveries from the backend
    const fetchData = async () => {
      try {
        const deliveriesResponse = await axios.get("http://localhost:5000/deliveries");
        setDeliveries(deliveriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter to show only trucks that are not available
  const unavailableTrucks = deliveries.filter(truck => truck.status !== "available");

  // Handle card click to open the modal
  const handleCardClick = (truck) => {
    setSelectedTruck(truck);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedTruck(null);
  };

  return (
    <>
      <div className="container p-4">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Current Deliveries (Unavailable Trucks)</h1>
        </div>

        {/* Truck Cards */}
        <div className="container p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {unavailableTrucks.length > 0 ? (
            unavailableTrucks.map((truck) => (
              <div
                key={truck._id}
                className="relative border w-25 h-20 rounded-lg shadow-lg p-4 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleCardClick(truck)} // Open modal with truck details
              >
                <h2 className="text-lg font-bold mb-2">Truck: {truck.truck_id?.vehicle_number || 'Unknown'}</h2>
                
                {/* Truck Image at the Bottom Right */}
                <img
                  src={truckImg}
                  alt="Truck"
                  className="absolute bottom-2 right-2 w-16 h-16 object-cover opacity-50"
                />
              </div>
            ))
          ) : (
            <p>No unavailable trucks found.</p>
          )}
        </div>

        {/* Modal */}
        {selectedTruck && (
          <Modal truck={selectedTruck} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default CurrentDeliveries;
