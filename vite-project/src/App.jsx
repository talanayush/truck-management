import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SendDelivery from './components/SendDelivery';
import ReceiveDelivery from './components/ReceiveDelivery';
import QRScanner from './components/Qr_Scanner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-8">Warehouse Transportation Management</h1>

        {/* Navigation Links */}
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li>
              <Link to="/send-delivery" className="text-blue-600 hover:text-blue-800">Send Delivery</Link>
            </li>
            <li>
              <Link to="/qr-scanner" className="text-blue-600 hover:text-blue-800">QR Scanner</Link>
            </li>
            <li>
              <Link to="/receive-delivery" className="text-blue-600 hover:text-blue-800">Receive Delivery</Link>
            </li>
          </ul>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/send-delivery" element={<SendDelivery />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/receive-delivery" element={<ReceiveDelivery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
