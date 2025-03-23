// src/components/ChatbotWidget.js
import React, { useState, useRef, useEffect } from 'react';

const ChatbotWidget = ({ systemDependencies, systemLogs }) => {
  const [collapsed, setCollapsed] = useState(true);
  // This chat history will now include both the user’s input and the bot’s responses.
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your troubleshooting assistant. How can I help you today?'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  // Toggle the widget's collapsed/expanded state.
  const toggleCollapsed = () => setCollapsed(!collapsed);

  // Auto-scroll the chat window when messages are updated.
  useEffect(() => {
    if (!collapsed && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, collapsed]);

  // Function to send the user input along with system context
  // to your FastAPI endpoint which handles the call to OpenAI.
  const handleSend = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;
    
    // Add the user's message to the visible chat history.
    const userMessage = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');

    // Build the conversation context that includes system dependencies and logs.
    const messagesForBackend = [
      {
        role: "system",
        content: `You are a troubleshooting assistant with expertise in analyzing system dependencies and system logs.
System Dependencies: ${systemDependencies || "None provided"}
System Logs: ${systemLogs || "No logs available"}
Based on these details, provide troubleshooting advice and suggest corrective actions.`
      },
      { role: "user", content: trimmedInput }
    ];

    try {
      // Call the FastAPI endpoint that wraps the OpenAI API call.
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: messagesForBackend })
      });

      const data = await response.json();
      let botReply = "";
      // Assuming your FastAPI returns a JSON like { reply: "..." }
      if (data && data.reply) {
        botReply = data.reply;
      } else {
        botReply = "I'm sorry, I couldn't process your request.";
      }
      // Append the bot's reply to the chat.
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error("Error calling FastAPI:", error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Error: Unable to retrieve a response from our troubleshooting assistant." }
      ]);
    }
  };

  // Allow sending messages on Enter key press.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: collapsed ? "60px" : "350px",
        height: collapsed ? "60px" : "450px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        borderRadius: "10px",
        background: "#fff",
        transition: "all 0.3s ease",
        zIndex: 1000,
        overflow: "hidden"
      }}
    >
      {/* Widget header: Click it to expand/collapse */}
      <div
        onClick={toggleCollapsed}
        style={{
          background: "#4e8bed",
          color: "#fff",
          padding: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          textAlign: "center",
          fontSize: "16px",
          whiteSpace: "nowrap"
        }}
      >
        {collapsed ? "Chat" : "Troubleshoot"}
      </div>

      {/* Chat window: Rendered only when expanded */}
      {!collapsed && (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100% - 40px)" }}>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              borderBottom: "1px solid #eee"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "8px",
                  textAlign: msg.sender === "bot" ? "left" : "right"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "8px",
                    background: msg.sender === "bot" ? "#f0f0f0" : "#4e8bed",
                    color: msg.sender === "bot" ? "#000" : "#fff",
                    maxWidth: "80%"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ display: "flex", padding: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "10px",
                padding: "8px 12px",
                backgroundColor: "#4e8bed",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;