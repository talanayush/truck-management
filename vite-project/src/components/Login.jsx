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
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 relative w-full">
                {/* Image */}
                <img
                    src={Image}
                    alt="Login Background"
                    className="object-cover w-full" // Ensure full coverage
                />

                {user ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-6 rounded-lg shadow-lg">
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
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <LoginWithGoogle />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
