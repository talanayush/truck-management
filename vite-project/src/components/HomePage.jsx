import React from 'react';
import './HomePage.css';
import Navbar from '../components/Navbar'
import bg from '../assets/logis.png'; // Import the background image
import Stats from '../components/Stats'
const HomePage = () => {
  return (
    <>
    <div className="bg-gray-800 h-screen flex flex-col">
        <div className="bg-my-image bg-cover  flex-grow  items-center">
          {/* <Navbar /> */}
          <div className="text-center ">
            <h1 className=" text-9xl mt-40 text-white font-bold">TRUCK MANAGEMENT</h1>
            <p className="text-4xl mt-10 text-white">The #1 logistics Platform</p>
          </div>
          <div className=" flex justify-center mt-20">
            <button
          
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              //onClick={onClick} // Pass the onClick function prop here
            >
              <a href="/send-delivery">Get Started</a>
            </button>
            
          </div>
          <button>
            <img src="./assets/arrow.png" alt="" />
          </button>
        </div>
      </div>
      <div className="text-white">
        <Stats/>
        {/* <Footer/> */}
      </div>
      </>
  );
};

export default HomePage;
