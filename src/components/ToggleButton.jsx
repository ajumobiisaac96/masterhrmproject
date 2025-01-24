import React, { useState } from "react";
import "./ToggleButton.css";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div
      className={`toggle-button ${isOn ? "on" : "off"}`}
      onClick={toggleButton}
    >
      <div className="toggle-thumb"></div>
    </div>
  );
};

export default ToggleButton;
