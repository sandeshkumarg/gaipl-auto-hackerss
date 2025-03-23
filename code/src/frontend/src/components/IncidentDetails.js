// IncidentDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { incidents } from '../data';
import DependencyGraph from './DependencyGraph';
import ChatbotWidget from './ChatbotWidget';

const IncidentDetails = () => {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((inc) => inc.id.toString() === incidentId);

  if (!incident) {
    return (
      <div>
        <h2>Incident not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  // For demonstration, convert dependencies and logs to strings.
  const systemDependencies = incident.dependencies.map(dep => dep.name).join(', ');
  // Assume incident.logs is available (or you can provide a sample)
  const systemLogs = incident.logs || "Sample log entry: [ERROR] Service X failed to respond at 12:34PM.";

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        &larr; Back to Home
      </button>
      <h1>{incident.name}</h1>
      <h2>Application: {incident.appName}</h2>
      <h3>Dependency Graph</h3>
      <DependencyGraph
        appName={incident.appName}
        dependencies={incident.dependencies}
        dependents={incident.dependents}
      />
      {/* Provide system context to the ChatbotWidget */}
      <ChatbotWidget systemDependencies={systemDependencies} systemLogs={systemLogs} />
    </div>
  );
};

export default IncidentDetails;