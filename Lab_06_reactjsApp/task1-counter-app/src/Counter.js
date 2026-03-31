import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    // Prevent count from going below 0
    if (count > 0) {
      setCount(count - 1);
    }
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter Application</h1>
      <p className="counter-subtitle">React State Management</p>

      <div className="counter-display">
        <span className={`count-value ${count === 0 ? "zero" : "positive"}`}>
          {count}
        </span>
      </div>

      <p className="count-label">Current Count</p>

      <div className="button-group">
        <button className="btn btn-increment" onClick={handleIncrement}>
          ➕ Increment
        </button>
        <button
          className="btn btn-decrement"
          onClick={handleDecrement}
          disabled={count === 0}
        >
          ➖ Decrement
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>

      {count === 0 && (
        <p className="min-warning">Count cannot go below 0</p>
      )}
    </div>
  );
}

export default Counter;
