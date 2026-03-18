import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
    { to: "/products", label: "Products" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">MyWebsite</div>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© 2026 MyWebsite. Built with React & React Router.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
