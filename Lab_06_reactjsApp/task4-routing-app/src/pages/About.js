import "./About.css";

function About() {
  const team = [
    { name: "Ali Hassan", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Sara Khan", role: "Lead Designer", emoji: "👩‍🎨" },
    { name: "Usman Tariq", role: "Head of Development", emoji: "👨‍💻" },
    { name: "Ayesha Malik", role: "Customer Success", emoji: "👩‍💼" },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="page-hero">
        <h1>About Us</h1>
        <p>Learn more about our story, mission, and the team behind MyWebsite.</p>
      </div>

      <div className="page-body">
        {/* Our Story */}
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            MyWebsite was founded in 2020 with a simple mission: to make quality products
            accessible to everyone. What started as a small online store has grown into a
            trusted platform serving thousands of customers across the country.
          </p>
          <p>
            We believe that great shopping experiences are built on trust, quality, and
            exceptional customer service. Every product in our catalog is carefully selected
            to ensure it meets our high standards.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">500+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">5</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>

        {/* Mission */}
        <div className="mission-box">
          <h2>Our Mission</h2>
          <p>
            To provide a seamless, secure, and enjoyable shopping experience for every customer,
            while offering products that bring real value to their lives.
          </p>
        </div>

        {/* Team */}
        <h2 className="team-heading">Meet the Team</h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <span className="team-emoji">{member.emoji}</span>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
