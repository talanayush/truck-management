import React from "react";
import { useNavigate } from "react-router-dom";
import MapWithRoute from "./Map";

const Modal = ({ truck, onClose }) => {
    const navigate = useNavigate();

    if (!truck) return null;

    const handleLiveTrackingClick = () => {
        navigate(`/live-tracking/${truck._id}`);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-gray-800 opacity-75"
                onClick={onClose}
            ></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-5xl w-full">
                <div className="flex justify-between">
                    <div className="w-1/2 pr-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Truck Details
                        </h2>
                        <p>
                            <strong>Truck ID:</strong>{" "}
                            {truck.truck_id?.vehicle_number || "Unknown"}
                        </p>
                        <p>
                            <strong>Source:</strong> {truck.source || "Unknown"}
                        </p>
                        <p>
                            <strong>Destination:</strong>{" "}
                            {truck.destination || "Unknown"}
                        </p>
                        <p>
                            <strong>Status:</strong> {truck.status}
                        </p>
                        <div className="mt-4">
                            <h3 className="font-bold mb-2">Items:</h3>
                            {truck.items.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {truck.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - Quantity:{" "}
                                            {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items in this truck</p>
                            )}
                        </div>
                        
                    </div>
                    <div className="w-1/2">
                        <MapWithRoute start={`${truck.source}`} end={`${truck.destination}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
