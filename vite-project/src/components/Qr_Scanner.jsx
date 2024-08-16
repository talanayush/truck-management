import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

const Qr_Scanner = ({ items, setItems }) => {
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState({});

    const startScanning = () => {
        setScanning(true);
    };

    const addItems = () => {
        try {
            setItems((prevItems) => {
                const updatedItems = [...prevItems];

                Object.keys(scanResult).forEach((truckNumber) => {
                    scanResult[truckNumber].forEach((item) => {
                        const existingItem = updatedItems.find(
                            (i) => i.item_id === item.item_id
                        );

                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            updatedItems.push(item);
                        }
                    });
                });

                return updatedItems;
            });

            setScanResult({});
            setScanning(false);
        } catch (error) {
            console.error("Error adding items:", error);
        }
    };

    useEffect(() => {
        let scanner = null;

        if (scanning) {
            setTimeout(() => {
                const element = document.getElementById("reader");

                if (element) {
                    scanner = new Html5QrcodeScanner("reader", {
                        qrbox: {
                            width: 300,
                            height: 300,
                        },
                        fps: 10,
                    });

                    const onScanSuccess = (result) => {
                        scanner.clear();

                        const [truckNumber, itemString] = result.split(":");
                        const item = { item_id: itemString, name: itemString, quantity: 1 };

                        setScanResult((prevResults) => ({
                            ...prevResults,
                            [truckNumber]: [
                                ...(prevResults[truckNumber] || []),
                                item,
                            ],
                        }));

                        setScanning(false);
                    };

                    const onScanError = (error) => {
                        console.warn("Scan error:", error);
                    };

                    scanner.render(onScanSuccess, onScanError);
                } else {
                    console.error("HTML Element with id=reader not found");
                }
            }, 100);
        }

        return () => {
            if (scanner) {
                scanner.clear().catch((error) => {
                    console.error("Error clearing scanner: ", error);
                });
            }
        };
    }, [scanning]);

    return (
        <div className="min-h-screen bg-gray-200 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
                Inventory Management of Truck
            </h1>
            <button
                onClick={startScanning}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 mb-6"
            >
                Add Product to Truck
            </button>
            {scanning && (
                <div className="flex justify-center w-full mb-6">
                    <div
                        id="reader"
                        className="border border-blue-500 bg-white p-4 rounded-lg shadow-lg"
                    ></div>
                </div>
            )}
            <div className="w-full max-w-3xl space-y-6">
                {Object.keys(scanResult).map((truckNumber) => (
                    <div
                        key={truckNumber}
                        className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {truckNumber} Items:
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            {scanResult[truckNumber].map((item, index) => (
                                <li key={index} className="text-gray-700">
                                    {item.name} (Quantity: {item.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button
                onClick={addItems}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300 mt-6"
            >
                Add these Items
            </button>
        </div>
    );
};

export default Qr_Scanner;
