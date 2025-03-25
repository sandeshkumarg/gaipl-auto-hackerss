import React from 'react';
import { incidents } from '../data';
import { useNavigate } from 'react-router-dom';

const IncidentDashboard = () => {
  const navigate = useNavigate();

  const handleIncidentClick = (id) => {
    navigate(`/incident/${id}`);
  };

  return (
    <div style={{ padding: '100px' }}>
      <h1>Active Incidents</h1>
      {incidents.length === 0 ? (
        <p>No active incidents</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="incident-card"
              onClick={() => handleIncidentClick(incident.id)}
            >
              <h2>{incident.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentDashboard;