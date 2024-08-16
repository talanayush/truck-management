import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // You can use any icon library

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-white bg-slate-800 hover:bg-green-700 focus:outline-none"
            >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-slate-800 text-white w-64 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-64"
                } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-64`}
            >
                <div className="p-4 pt-8"> {/* Added pt-8 for top padding */}
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/send-delivery"
                                className="block p-2 hover:bg-green-700 rounded"
                            >
                                Send Truck
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/receive-delivery"
                                className="block p-2 hover:bg-green-700 rounded"
                            >
                                Receive Truck
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/current-deliveries"
                                className="block p-2 hover:bg-green-700 rounded"
                            >
                                View All Deliveries
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
