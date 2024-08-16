import React, { useState, useEffect } from "react";

const TruckManagement = () => {
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        // Fetch trucks from your backend
        fetch("/api/trucks")
            .then((response) => response.json())
            .then((data) => setTrucks(data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Truck Management</h1>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Vehicle Number</th>
                        <th className="py-2 px-4 border-b">Capacity</th>
                        <th className="py-2 px-4 border-b">Driver Name</th>
                    </tr>
                </thead>
                <tbody>
                    {trucks.map((truck) => (
                        <tr key={truck.vehicle_number}>
                            <td className="py-2 px-4 border-b">
                                {truck.vehicle_number}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {truck.capacity}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {truck.driver_name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TruckManagement;
