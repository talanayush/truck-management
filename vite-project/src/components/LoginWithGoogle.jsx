import React, { useEffect, useState } from 'react';
import { account } from "./appwrite";

function LoginWithGoogle() {
    async function handleLogin() {
        console.log('Called Handle Login!');

        try {
            await account.createOAuth2Session(
                'google',
                'http://localhost:5173/login',
                'http://localhost:5173/login'
            );
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button
                className="login-btn px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={handleLogin}
            >
                Login with Google
            </button>
        </div>
    );
}

export default LoginWithGoogle;
