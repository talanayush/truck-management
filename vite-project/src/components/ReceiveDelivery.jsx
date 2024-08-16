import React, { useState } from "react";
import axios from "axios";

const ReceiveDelivery = () => {
    const [pin, setPin] = useState("");
    const [delivery, setDelivery] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);

    const handleFetchDelivery = async () => {
        try {
            console.log(pin);
            const response = await axios.get(
                `http://localhost:5000/deliveries/${pin}`
            );
            setDelivery(response.data);
            setCheckedItems(
                response.data.items.map((item) => ({ ...item, checked: false }))
            );
        } catch (error) {
            console.error("Error fetching delivery:", error);
        }
    };

    const handleCompleteDelivery = async () => {
        try {
            if (!pin) {
                alert("Delivery ID (pin) is missing.");
                return;
            }

            const response = await axios.put(
                `http://localhost:5000/deliveries/complete/${pin}`
            );
            alert("Delivery completed! Status changed to Completed");
            console.log("Delivery response:", response.data);
        } catch (error) {
            console.error("Error completing delivery:", error);

            if (error.response && error.response.status === 404) {
                alert("Delivery not found. Please check the delivery ID.");
            } else {
                alert(
                    "An error occurred while completing the delivery. Please try again later."
                );
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <main id="main-content">
                <section id="receive" className="section tab-content active">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Receive Delivery
                    </h2>

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">
                            Enter PIN:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                className="border border-gray-300 bg-white p-2 rounded-l-md w-full text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition"
                                onClick={handleFetchDelivery}
                            >
                                Fetch
                            </button>
                        </div>
                    </div>

                    {delivery && (
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-gray-800">
                                Delivery Items
                            </h3>
                            {delivery.items.map((item) => (
                                <div
                                    key={item.item_id}
                                    className="flex items-center mb-3 p-2 border border-gray-200 rounded-md shadow-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            checkedItems.find(
                                                (i) => i.item_id === item.item_id
                                            )?.checked || false
                                        }
                                        onChange={(e) => {
                                            setCheckedItems((prev) =>
                                                prev.map((i) =>
                                                    i.item_id === item.item_id
                                                        ? {
                                                              ...i,
                                                              checked: e.target.checked,
                                                          }
                                                        : i
                                                )
                                            );
                                        }}
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                    />
                                    <span className="ml-3 text-gray-700 text-sm">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                            <button
                                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                                onClick={handleCompleteDelivery}
                            >
                                Complete
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ReceiveDelivery;
