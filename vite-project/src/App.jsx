import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SendDelivery from './components/SendDelivery';
import ReceiveDelivery from './components/ReceiveDelivery';
import QRScanner from './components/Qr_Scanner';
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import './styles.css'; // Import your styles

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/send-delivery" element={<SendDelivery />} />
            <Route path="/receive-delivery" element={<ReceiveDelivery />} />
            <Route path="/qr-scanner" element={<QRScanner />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
