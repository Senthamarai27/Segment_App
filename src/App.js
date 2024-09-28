import React, { useState } from "react";
import Popup from "./Popup";
import "./App.css";

function App() {
  const [showSideWindow, setShowSideWindow] = useState(false);

  const handleSaveSegmentClick = () => {
    setShowSideWindow(true);
  };

  const handleCloseWindow = () => {
    setShowSideWindow(false);
  };

  const handleSubmit = (data) => {
    // Send data to the server via the webhook URL
    fetch("https://webhook.site/35a01a7b-4233-4edf-bd95-8c391facddc4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Close the side window after submission
    setShowSideWindow(false);
  };

  return (
    <div className="container">
      {/* Save Segment Button, positioned to the left top */}
      <button className="save-segment-btn" onClick={handleSaveSegmentClick}>
        Save Segment
      </button>

      {/* Side window for popup */}
      {showSideWindow && (
        <div className="side-window">
          {/* Close button */}
          <button className="close-btn" onClick={handleCloseWindow}>
            &times;
          </button>

          {/* Popup component to input segment name and schema */}
          <Popup onSubmit={handleSubmit} onClose={handleCloseWindow} />
        </div>
      )}
    </div>
  );
}

export default App;
