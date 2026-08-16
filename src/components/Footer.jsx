import { Link } from "react-router-dom";
import "../styles/layout.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ApexGear
          </Link>

          <p>
            Modern technology for work, play,
            and everything in between.
          </p>
        </div>

        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ApexGear. All rights reserved.
        </p>

        <p className="footer-location">
          Built for what&apos;s next.
        </p>
      </div>
    </footer>
  );
}

export default Footer;