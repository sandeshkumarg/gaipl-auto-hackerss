// LogDisplay.js
import React, { useState } from "react";
import systemLogs from "../logs.js"; // Adjust the relative path if needed

const LogDisplay = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLogs = () => setIsExpanded(prev => !prev);

  return (
    <div style={styles.container}>
      <h2 onClick={toggleLogs} style={styles.header}>
        System Logs {isExpanded ? "[-]" : "[+]"}
      </h2>
      {isExpanded && (
        <ul style={styles.logList}>
          {systemLogs.map((log, index) => (
            <li key={index} style={styles.logItem}>
              <strong>{log.timestamp}</strong> [{log.severity}] - {log.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
    container: {
      margin: "20px 0",
    },
    header: {
      background: "#eee",
      padding: "10px",
      cursor: "pointer",
    },
    logList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      border: "1px solid #ddd",
      borderTop: "none",
    },
    logItem: {
      padding: "8px 12px",
      borderBottom: "1px solid #ddd",
    },
  };

export default LogDisplay;