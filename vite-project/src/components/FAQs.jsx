import React, { useState } from "react";

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question:
                "What types of goods can be transported using your services?",
            answer: "We can transport a wide range of goods including perishables, electronics, machinery, construction materials, and more. Each type of cargo is handled with care to ensure safe delivery.",
        },
        {
            question: "How do I track the status of my shipment?",
            answer: "You can track your shipment in real-time by using the 'Live Tracking' feature on our website. Simply enter your truck ID to see the current location and estimated delivery time.",
        },
        {
            question: "What is the maximum load capacity for each truck?",
            answer: "Our trucks can carry loads ranging from 5 tons to 40 tons, depending on the truck type. For specific load requirements, please contact our logistics team.",
        },
        {
            question: "How are items secured during transportation?",
            answer: "Items are secured using industry-standard packing materials and loading techniques. We use straps, padding, and other safety measures to ensure that your goods are protected throughout the journey.",
        },
        {
            question: "What should I do if my shipment is delayed?",
            answer: "In the event of a delay, please contact our customer support team. We will provide you with the latest updates on your shipment and work to resolve any issues as quickly as possible.",
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
