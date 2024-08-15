import React from 'react';
import SendDelivery from './components/SendDelivery';
import ReceiveDelivery from './components/ReceiveDelivery';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">Warehouse Transportation Management</h1>
      <div className="mb-8">
        <SendDelivery />
      </div>
      <div>
        <ReceiveDelivery />
      </div>
    </div>
  );
}

export default App;
