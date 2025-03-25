import React, { useState } from 'react';
import IncidentDashboard from './components/IncidentDashboard';
import IncidentDetails from './components/IncidentDetails';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import ChatbotWidget from './components/ChatbotWidget';
import Monitoring from './components/Monitoring';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfigManagement from './components/ConfigManagement';
import Reporting from './components/Reporting';
import Automation from './components/Automation';
import Header from './components/Header';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [iconColor, setIconColor] = useState('black');

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIconColor(isSidebarOpen ? '#a1c4fd' : 'black'); // Toggle icon color
  };
  return (
    <div className={`main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
      <Header onMenuClick={handleMenuClick} iconColor={iconColor} />
      <div style={{ display: 'flex' }}>
        {isSidebarOpen && <Sidebar />}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incident" element={<IncidentDashboard />} />
            <Route path="/incident/:incidentId" element={<IncidentDetails />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/config-management" element={<ConfigManagement />} />

          </Routes>
        </div>
        <ChatbotWidget systemDependencies="Sample Dependencies" systemLogs="Sample Logs" />
      </div>
    </div>
  );
};

export default App;
