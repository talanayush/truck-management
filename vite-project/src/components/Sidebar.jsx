import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiTruck, HiClipboardList, HiInbox } from "react-icons/hi"; // Importing icons

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
                className={`fixed top-0 left-0 h-full bg-slate-900 text-white w-64 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-64"
                } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-64`}
            >
                <div className="p-6 pt-10"> {/* Added pt-10 for top padding */}
                    
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/send-delivery"
                                className="flex items-center p-3 hover:bg-green-700 rounded transition-colors duration-200"
                            >
                                <HiTruck className="mr-3" size={20} />
                                <span>Send Truck</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/receive-delivery"
                                className="flex items-center p-3 hover:bg-green-700 rounded transition-colors duration-200"
                            >
                                <HiInbox className="mr-3" size={20} />
                                <span>Receive Truck</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/current-deliveries"
                                className="flex items-center p-3 hover:bg-green-700 rounded transition-colors duration-200"
                            >
                                <HiClipboardList className="mr-3" size={20} />
                                <span>View All Deliveries</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
