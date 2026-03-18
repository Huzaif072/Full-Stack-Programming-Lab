import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-msg">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="home-btn">
         Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
