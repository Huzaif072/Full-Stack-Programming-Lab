import { useState } from "react";
import "./UserForm.css";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  function handleSubmit() {
    if (name.trim() === "" || email.trim() === "") {
      alert("Please fill in both Name and Email fields.");
      return;
    }

    // Save submitted data to display below
    setSubmittedData({ name, email });

    // Clear input fields after submission
    setName("");
    setEmail("");
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1>User Registration</h1>
          <p>Fill in your details below</p>
        </div>

        <div className="form-body">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {submittedData && (
        <div className="result-card">
          <h3>Submitted Information</h3>
          <div className="result-row">
            <span className="result-label">Name:</span>
            <span className="result-value">{submittedData.name}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Email:</span>
            <span className="result-value">{submittedData.email}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserForm;
