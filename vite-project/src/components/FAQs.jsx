import React, { useState } from "react";

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How does the Real-Time Truck Tracking feature work?",
            answer: "Our Real-Time Truck Tracking feature allows you to monitor truck deliveries between warehouses with up-to-date status information. Simply access the tracking page, enter your truck ID, and see the current location and status of your delivery.",
        },
        {
            question: "Can I track multiple trucks at the same time?",
            answer: "Yes, you can track multiple trucks simultaneously. Our platform provides a comprehensive view of all active deliveries, allowing you to monitor each truck's location and status in real-time.",
        },
        {
            question: "How do I use the QR Code Scanning feature?",
            answer: "To use the QR Code Scanning feature, simply scan the unique QR code assigned to each truck and item. This ensures accurate delivery tracking and helps verify that all dispatched items are correctly received.",
        },
        {
            question:
                "What information is available on the Warehouse Dashboards?",
            answer: "Our Detailed Warehouse Dashboards provide comprehensive views of trucks sent and received, including status updates, delivery times, and inventory levels. This helps ensure efficient inventory management and smooth operations.",
        },
        {
            question: "How does the Complete Item Verification process work?",
            answer: "The Complete Item Verification process involves scanning the QR codes of dispatched items to confirm that all have been received. This helps ensure accurate inventory management and prevents discrepancies.",
        },
        {
            question:
                "Can I access the tracking information from my mobile device?",
            answer: "Yes, our platform is mobile-friendly, allowing you to access real-time tracking information and other features from your smartphone or tablet.",
        },
        {
            question: "What happens if an item is missing upon delivery?",
            answer: "If an item is missing upon delivery, our system will alert you immediately. You can then contact our support team to investigate the issue and take necessary action to resolve it.",
        },
        {
            question: "How secure is the QR Code Scanning process?",
            answer: "The QR Code Scanning process is highly secure, ensuring that each scan is unique and tied to specific items and trucks. This prevents unauthorized access and ensures accurate tracking.",
        },
        {
            question:
                "Can I customize the information displayed on the Warehouse Dashboards?",
            answer: "Yes, the Warehouse Dashboards can be customized to display the information most relevant to your operations. You can filter data by truck, delivery status, or inventory levels to get the insights you need.",
        },
        {
            question:
                "Is there a limit to the number of items I can track with QR codes?",
            answer: "There is no limit to the number of items you can track using QR codes. Our system is designed to handle large volumes of data, making it ideal for managing complex inventories.",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Frequently Asked Questions
            </h1>
            {faqData.map((item, index) => (
                <div key={index} className="mb-4">
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left text-xl font-semibold p-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {item.question}
                        <span className="float-right">
                            {activeIndex === index ? "-" : "+"}
                        </span>
                    </button>
                    {activeIndex === index && (
                        <div className="mt-2 p-4 bg-gray-100 rounded-md">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQPage;
