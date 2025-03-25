import React from 'react';
import { incidents } from '../data';
import { useNavigate, useParams } from 'react-router-dom';

const IncidentDashboard = () => {
  const navigate = useNavigate();
  const { status } = useParams();

  const handleIncidentClick = (id) => {
    navigate(`/incidentdetails/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'yellow';
      case 'closed':
        return 'green';
      case 'inprogress':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const filteredIncidents = status === 'all' || status === undefined
    ? incidents
    : incidents.filter((incident) => incident.status === status);

  return (
    <div style={{ padding: '100px' }}>
      <h1>Active Incidents</h1>
      {filteredIncidents.length === 0 ? (
        <p>No active incidents</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="incident-card"
              onClick={() => handleIncidentClick(incident.id)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <h2>{incident.name}</h2>
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '100px',
                  textAlign: 'center',
                  backgroundColor: getStatusColor(incident.status),
                  color: 'black',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                {incident.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentDashboard;