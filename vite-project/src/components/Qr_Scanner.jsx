import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

const Qr_Scanner = ({ items, setItems }) => {
    const [scanning, setScanning] = useState(false); // To control scanner visibility
    const [scanResult, setScanResult] = useState({});

    const startScanning = () => {
        setScanning(true); // Start scanning
    };

    const addItems = () => {
        try {
            // Append scanResult items to the existing items
            setItems((prevItems) => {
                const updatedItems = [...prevItems];

                // Update items with scanned results
                Object.keys(scanResult).forEach((truckNumber) => {
                    scanResult[truckNumber].forEach((item) => {
                        // Check if the item already exists
                        const existingItem = updatedItems.find(
                            (i) => i.item_id === item.item_id
                        );

                        if (existingItem) {
                            // Update quantity if item exists
                            existingItem.quantity += 1;
                        } else {
                            // Add new item if it does not exist
                            updatedItems.push(item);
                        }
                    });
                });

                return updatedItems;
            });

            // Reset scanResult after adding items
            setScanResult({});
            setScanning(false); // Hide scanner after adding items
        } catch (error) {
            console.error("Error adding items:", error);
        }
    };

    useEffect(() => {
        let scanner = null;

        if (scanning) {
            // Ensure a delay to let the DOM element be rendered
            setTimeout(() => {
                const element = document.getElementById("reader");

                if (element) {
                    scanner = new Html5QrcodeScanner("reader", {
                        qrbox: {
                            width: 250,
                            height: 250,
                        },
                        fps: 5,
                    });

                    const onScanSuccess = (result) => {
                        scanner.clear(); // Clear the scanner after a successful scan

                        // Extract truck number and item from the scanned result
                        const [truckNumber, itemString] = result.split(":"); // Assuming format is "TRUCK001:item1"


                        const item = {
                            item_id: itemString,
                            name: result,
                            quantity: 1,
                        }; // Assuming item object structure

                        console.log('Result: ', result);

                        // Update the state to group items under each truck
                        setScanResult((prevResults) => ({
                            ...prevResults,
                            [truckNumber]: [
                                ...(prevResults[truckNumber] || []),
                                item,
                            ],
                        }));

                        // Reset scanning state to show the dialog box again
                        setScanning(false);
                    };

                    const onScanError = (error) => {
                        console.warn("Scan error:", error);
                    };

                    scanner.render(onScanSuccess, onScanError);
                } else {
                    console.error("HTML Element with id=reader not found");
                }
            }, 100); // 100ms delay, adjust as needed
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
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
                Inventory Management of Truck
            </h1>
            <div className="flex justify-center">
                <button
                    onClick={startScanning}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                >
                    Add Product to Truck
                </button>
            </div>
            {scanning && (
                <div className="flex justify-center mt-4">
                    <div
                        id="reader"
                        className="border border-gray-400 p-4 rounded-lg shadow-lg"
                    ></div>
                </div>
            )}
            <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-700 mb-2">Items:</h2>
                
                {Object.keys(scanResult).map((truckNumber) => (
                    <div
                        key={truckNumber}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <ul className="list-disc list-inside space-y-1">
                            {scanResult[truckNumber].map((item, index) => (
                                <li key={index} className="text-gray-600">
                                    {item.name} (Quantity: {item.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <button
                onClick={addItems}
                className="bg-blue-500 text-white p-2 rounded mt-4"
            >
                Add these Items
            </button>
        </div>
    );
};

export default Qr_Scanner;
