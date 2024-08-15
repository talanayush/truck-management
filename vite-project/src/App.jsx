import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SendDelivery from './components/SendDelivery';
import ReceiveDelivery from './components/ReceiveDelivery';
import QRScanner from './components/Qr_Scanner';
import './styles.css'; // Import your styles

const App = () => {
  const [activeTab, setActiveTab] = useState('send'); // State to manage active tab

  // Toggle sidebar collapse
  const toggleSideTab = () => {
    const sideTab = document.getElementById('side-tab');
    sideTab.classList.toggle('collapsed');
  };

  return (
    <Router>
      <div className="container">
        {/* Sidebar */}
        <div className="side-tab" id="side-tab">
          <button className="toggle-btn" onClick={toggleSideTab}>
            &#9776;
          </button>
          <div className="tabs">
            <Link
              to="/send-delivery"
              className={`tab-button ${activeTab === 'send' ? 'active' : ''}`}
              onClick={() => setActiveTab('send')}
            >
              Send Trucks
            </Link>
            <Link
              to="/receive-delivery"
              className={`tab-button ${activeTab === 'receive' ? 'active' : ''}`}
              onClick={() => setActiveTab('receive')}
            >
              Receive Trucks
            </Link>
            <Link
              to="/qr-scanner"
              className={`tab-button ${activeTab === 'qr' ? 'active' : ''}`}
              onClick={() => setActiveTab('qr')}
            >
              QR Scanner
            </Link>
          </div>
        </div>

        {/* Main content */}
        <main id="main-content">
          <Routes>
            <Route path="/send-delivery" element={<SendDelivery />} />
            <Route path="/receive-delivery" element={<ReceiveDelivery />} />
            <Route path="/qr-scanner" element={<QRScanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
