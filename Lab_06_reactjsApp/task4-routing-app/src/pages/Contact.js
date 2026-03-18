import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setSubmitted(true);
  }

  function handleReset() {
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(false);
  }

  return (
    <div className="contact-page">
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>Have a question or feedback? We'd love to hear from you!</p>
      </div>

      <div className="page-body contact-body">
        {/* Info Cards */}
        <div className="contact-info">
          <div className="info-card">
            <h4>Email</h4>
            <p>support@mywebsite.com</p>
          </div>
          <div className="info-card">
            <h4>Phone</h4>
            <p>+92 300 1234567</p>
          </div>
          <div className="info-card">
            <h4>Address</h4>
            <p>Lahore, Punjab, Pakistan</p>
          </div>
        </div>

        {/* Form */}
        {!submitted ? (
          <div className="contact-form">
            <h2>Send a Message</h2>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name..."
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        ) : (
          <div className="success-card">
            <h2>Message Sent!</h2>
            <p>Thank you, <strong>{formData.name}</strong>! We've received your message and will get back to you at <strong>{formData.email}</strong> shortly.</p>
            <button className="reset-btn" onClick={handleReset}>
              Send Another Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
