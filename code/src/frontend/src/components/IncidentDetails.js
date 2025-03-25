// IncidentDetails.js
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { incidents } from '../data';
import DependencyGraph from './DependencyGraph';
import ChatbotWidget from './ChatbotWidget';
import LogDisplay from "./LogDisplay";
import axios from "axios"; // Using Axios for making API calls

const IncidentDetails = () => {
  
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((inc) => inc.id.toString() === incidentId);

  if (!incident) {
    return (
      <div>
        <h2>Incident not found</h2>
        <button onClick={() => navigate('/incident')}>Back to Incidents</button>
      </div>
    );
  }

  // For demonstration, convert dependencies and logs to strings.
  const systemDependencies = incident.dependencies.map(dep => dep.name).join(', ');
  // Assume incident.logs is available (or you can provide a sample)
  //const systemLogs = incident.logs || "Sample log entry: [ERROR] Service X failed to respond at 12:34PM.";


  // Function to convert JSON data to a single string
  function generatePlatformString(data) {
    const type = data.type || "Unknown type";
    const namespace = data.namespace || "Unknown namespace";
    const hosts = data.hosts && data.hosts.length > 0 
      ? data.hosts.join(", ") 
      : "No hosts available";

    return `The platform type is ${type}, operating within the namespace "${namespace}". It is hosted on the following nodes: ${hosts}.`;
  }


  const [systemLogs, setSystemLogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Destructure the required parameters from the passed incident object.
  const dependencies = incident.dependencies.map(dep => dep.name).join(', ');
  const name = incident.appName;
  const platform = generatePlatformString(incident.platform);
  const startTime = '2024-03-24 12:10:00';
  const endTime = '2024-03-24 12:20:00';


  useEffect(() => {
    // Function to fetch system logs from the external API
    const fetchSystemLogs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Example API URL; adjust this according to your API endpoint.
        const apiUrl = "http://localhost:8000/logs";

        const response = await axios.post(apiUrl, {
            name: name,
            platform: platform,
            deps: dependencies, // Assume dependencies is an array.
            start: startTime,
            end: endTime,
        });

        // Update the state with the fetched logs.
        setSystemLogs(response.data);
        console.log(response);
      } catch (err) {
        // Handle any errors that occur during the API call.
        setError("Failed to fetch system logs. Please try again later.");
        console.error("Error fetching system logs:", err);
      } finally {
        setLoading(false);
      }
    };

    // Call the function when the component mounts.
    fetchSystemLogs();
  }, [name, platform, dependencies, startTime, endTime]); // Re-run the effect if parameters change.




  return (
    <div style={{ position: 'relative' , adding: '100px'}}>
      <button onClick={() => navigate('/incident')} style={{ marginBottom: '20px' }}>
        &larr; Back to Incidents
      </button>
      <h1>{incident.name}</h1>
      <h2>Incident ID: {incident.id}</h2>
      <h2>Application: {incident.appName}</h2>
      <hr />
      <LogDisplay systemLogs={systemLogs}/>
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