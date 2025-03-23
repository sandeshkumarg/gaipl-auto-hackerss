import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import IncidentDetails from './components/IncidentDetails';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/incident/:incidentId" element={<IncidentDetails />} />
      </Routes>
    </div>
  );
};

export default App;