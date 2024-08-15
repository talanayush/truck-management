import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Modal = ({ truck, onClose }) => {
  const navigate = useNavigate(); // Use useNavigate hook

  if (!truck) return null;

  const handleLiveTrackingClick = () => {
    navigate(`/live-tracking/${truck._id}`); // Navigate to live tracking page with truck ID
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-75" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Truck Details</h2>
        <p><strong>Truck ID:</strong> {truck.truck_id?.vehicle_number || 'Unknown'}</p>
        <p><strong>Source:</strong> {truck.source || 'Unknown'}</p>
        <p><strong>Destination:</strong> {truck.destination || 'Unknown'}</p>
        <p><strong>Status:</strong> {truck.status}</p>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Items:</h3>
          {truck.items.length > 0 ? (
            <ul className="list-disc list-inside">
              {truck.items.map((item, index) => (
                <li key={index}>{item.name} - Quantity: {item.quantity}</li>
              ))}
            </ul>
          ) : (
            <p>No items in this truck</p>
          )}
        </div>
        <div className="grid row-2 gap-3"> 
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded"
            onClick={handleLiveTrackingClick}
          >
            Live Tracking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
