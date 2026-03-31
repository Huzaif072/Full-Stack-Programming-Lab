import { useState } from "react";
import "./Actions.css";

const BG_COLORS = [
  "#f0f4f8", "#fff5f5", "#f0fff4", "#fffff0",
  "#f0f0ff", "#fff0ff", "#f0ffff", "#ffe8d6"
];

function Actions() {
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("#f0f4f8");
  const [textColor, setTextColor] = useState("#2d3748");

  function handleShowMessage() {
    setMessage("Hello! You clicked the Show Message button!");
  }

  function handleChangeBackground() {
    const randomColor = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
    setBgColor(randomColor);
    document.body.style.backgroundColor = randomColor;
    setMessage("Background color changed!");
  }

  function handleShowAlert() {
    alert("Alert! This is a React event handling demo!");
    setMessage("Alert was shown!");
  }

  function handleMouseOver(e) {
    e.target.style.color = "#e53e3e";
  }

  function handleMouseOut(e) {
    e.target.style.color = "";
  }

  return (
    <div className="actions-container" style={{ backgroundColor: bgColor }}>
      <h1 className="actions-title">Interactive Buttons App</h1>
      <p className="actions-subtitle">React Event Handling Demo</p>

      <div className="buttons-grid">
        <button
          className="action-btn btn-message"
          onClick={handleShowMessage}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Show Message
        </button>

        <button
          className="action-btn btn-color"
          onClick={handleChangeBackground}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Change Background
        </button>

        <button
          className="action-btn btn-alert"
          onClick={handleShowAlert}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Show Alert
        </button>
      </div>

      {message && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}

      <p className="hover-hint">Hover over buttons to change text color</p>
    </div>
  );
}

export default Actions;
