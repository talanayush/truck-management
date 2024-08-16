import React, { useEffect, useState } from "react";
import axios from "axios";
import truckImg from "../assets/truck.jpg";
import Modal from "../components/Modal"; // Import the Modal component
import "../styles.css"; // Assuming you have a CSS file for custom styles
import MapWithRoute from "./Map";

const CurrentDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState(null);

    useEffect(() => {
        // Fetch deliveries from the backend
        const fetchData = async () => {
            try {
                const deliveriesResponse = await axios.get(
                    "http://localhost:5000/deliveries"
                );
                setDeliveries(deliveriesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Filter deliveries by status
    const inProgressTrucks = deliveries.filter(
        (truck) => truck.status === "in progress"
    );
    const completedTrucks = deliveries.filter(
        (truck) => truck.status === "completed"
    );
    const cancelledTrucks = deliveries.filter(
        (truck) => truck.status === "cancelled"
    );

    // Handle card click to open the modal
    const handleCardClick = (truck) => {
        setSelectedTruck(truck);
    };

    // Handle close modal
    const handleCloseModal = () => {
        setSelectedTruck(null);
    };

    return (
        <div className="container p-4 grid">
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">In Progress</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inProgressTrucks.length > 0 ? (
                        inProgressTrucks.map((truck) => (
                            <div
                                key={truck._id}
                                className="relative border rounded-lg shadow-lg p-4 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                onClick={() => handleCardClick(truck)} // Open modal with truck details
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    Truck:{" "}
                                    {truck.truck_id?.vehicle_number ||
                                        "Unknown"}
                                </h3>
                                <p className="text-sm mb-2">
                                    Status: {truck.status}
                                </p>
                                <img
                                    src={truckImg}
                                    alt="Truck"
                                    className="absolute bottom-2 right-2 w-16 h-16 object-cover opacity-50"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No trucks in progress.</p>
                    )}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Completed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedTrucks.length > 0 ? (
                        completedTrucks.map((truck) => (
                            <div
                                key={truck._id}
                                className="relative border rounded-lg shadow-lg p-4 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                onClick={() => handleCardClick(truck)} // Open modal with truck details
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    Truck:{" "}
                                    {truck.truck_id?.vehicle_number ||
                                        "Unknown"}
                                </h3>
                                <p className="text-sm mb-2">
                                    Status: {truck.status}
                                </p>
                                <img
                                    src={truckImg}
                                    alt="Truck"
                                    className="absolute bottom-2 right-2 w-16 h-16 object-cover opacity-50"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No completed trucks found.</p>
                    )}
                </div>
            </section>

            {/* Cancelled Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Cancelled</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cancelledTrucks.length > 0 ? (
                        cancelledTrucks.map((truck) => (
                            <div
                                key={truck._id}
                                className="relative border rounded-lg shadow-lg p-4 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                onClick={() => handleCardClick(truck)} // Open modal with truck details
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    Truck:{" "}
                                    {truck.truck_id?.vehicle_number ||
                                        "Unknown"}
                                </h3>
                                <p className="text-sm mb-2">
                                    Status: {truck.status}
                                </p>
                                <img
                                    src={truckImg}
                                    alt="Truck"
                                    className="absolute bottom-2 right-2 w-16 h-16 object-cover opacity-50"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No cancelled trucks found.</p>
                    )}
                </div>
            </section>

            {/* Modal */}
            {selectedTruck && (
                <Modal truck={selectedTruck} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default CurrentDeliveries;
