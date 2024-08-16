import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/logix.jpg";
import LoginWithGoogle from "./LoginWithGoogle";
import { account } from "./appwrite"; // Ensure this import is correct

const Login = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await account.get(); // Fetch user data
                setUser(userData); // Set user state
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current"); // Logout user
            setUser(null); // Clear user state
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    const handleGoto = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Image Container */}
            <div className="relative flex-shrink-0">
                <img
                    src={Image}
                    alt="Login Background"
                    className="object-cover w-full h-[60vh] md:h-[70vh] lg:h-[80vh]" // Dynamic height for different viewports
                />
                {/* LoginWithGoogle Component on top of the image */}
                {!user && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <LoginWithGoogle />
                    </div>
                )}
                {/* User-specific overlay */}
                {user && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-6 rounded-lg shadow-lg z-20">
                        <div className="text-center">
                            <p className="text-2xl font-bold mb-2">Welcome</p>
                            <p className="text-lg mb-2">{user.name || "???"}</p>
                            <p className="text-sm mb-4">{user.email || "???"}</p>
                            <div className="flex flex-col space-y-4">
                                <button
                                    className="py-2 px-6 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-900 transition duration-300 ease-in-out"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                                <button
                                    className="py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition duration-300 ease-in-out"
                                    onClick={handleGoto}
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 bg-gray-900 text-white p-8">
                {/* About Us Section */}
                <div className="mt-0">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold mb-4">About Us</h2>
                        <p className="text-base mb-8 leading-relaxed">
                            Welcome to our application. We strive to offer the best service for managing your logistics and tracking deliveries. Our team is dedicated to providing a seamless experience and excellent customer support. If you have any questions or feedback, feel free to reach out to us.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Feature 1 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                            <h3 className="text-xl font-semibold mb-2">Real-Time Truck Tracking</h3>
                            <p className="text-sm leading-relaxed">
                                Monitor truck deliveries between warehouses with up-to-date status information.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                            <h3 className="text-xl font-semibold mb-2">QR Code Scanning</h3>
                            <p className="text-sm leading-relaxed">
                                Ensure accurate delivery by scanning unique QR codes assigned to each truck and item.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                            <h3 className="text-xl font-semibold mb-2">Detailed Warehouse Dashboards</h3>
                            <p className="text-sm leading-relaxed">
                                Access comprehensive views of trucks sent and received for efficient inventory management.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-red-500">
                            <h3 className="text-xl font-semibold mb-2">Complete Item Verification</h3>
                            <p className="text-sm leading-relaxed">
                                Confirm that all dispatched items have been received with precise QR code checks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="footer bg-base-200 text-base-content p-10 mt-0">
                <aside>
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Login;
