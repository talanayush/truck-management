import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-green-600 text-white shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-green-700 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Send Truck</Link></li>
            <li>
              <Link to="/">Deliveries</Link>
              <ul className="p-2 bg-green-800">
                <li><Link to="/">Scheduled</Link></li>
                <li><Link to="/">Current</Link></li>
                <li><Link to="/">Previous</Link></li>
              </ul>
            </li>
            <li><Link to="/">Receive Truck</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case font-bold text-xl text-white">Truck Management</Link>
      </div>
      <div className="navbar-center font-bold hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/send-delivery">Send Truck</Link></li>
          <li>
            <details>
              <summary>Deliveries</summary>
              <ul className="p-2 bg-green-800">
              <li><Link to="/">Scheduled</Link></li>
                <li><Link to="/">Current</Link></li>
                <li><Link to="/">Previous</Link></li>
              </ul>
            </details>
          </li>
          <li><Link to="/receive-delivery">Receive Truck</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn bg-white text-green-600 border-none hover:bg-gray-200">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
