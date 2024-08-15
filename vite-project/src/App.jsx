import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SendDelivery from './components/SendDelivery';
import ReceiveDelivery from './components/ReceiveDelivery';
import QRScanner from './components/Qr_Scanner';
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import LiveTracking from './components/MapWithPath'
import Navbar from './components/Navbar';
import CurrentDeliveries from './components/CurrentDeliveries'
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
            {/* <Route path="/live-tracking/:truckId" component={<LiveTracking/>} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/send-delivery" element={<SendDelivery />} />
            <Route path="/current-deliveries" element={<CurrentDeliveries />} />
            <Route path="/receive-delivery" element={<ReceiveDelivery />} />
            <Route path="/qr-scanner" element={<QRScanner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
