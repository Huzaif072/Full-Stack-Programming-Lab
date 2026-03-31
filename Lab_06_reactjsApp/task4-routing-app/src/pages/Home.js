import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const features = [
    { title: "Amazing Products", desc: "Browse our wide selection of quality products at great prices." },
    { title: "Fast Delivery", desc: "Get your orders delivered to your doorstep within 2-3 business days." },
    { title: "Secure Payments", desc: "Your transactions are always safe and encrypted with us." },
    { title: "24/7 Support", desc: "Our support team is always ready to help you anytime." },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <h1>Welcome to MyWebsite</h1>
        <p>Your one-stop destination for amazing products and great deals. Discover, shop, and enjoy!</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-primary">Shop Now 🛒</Link>
          <Link to="/about" className="btn-secondary">Learn More</Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="cta-banner">
        <h2>Ready to get started?</h2>
        <p>Join thousands of happy customers shopping with us today.</p>
        <Link to="/contact" className="btn-primary">Contact Us</Link>
      </div>
    </div>
  );
}

export default Home;
