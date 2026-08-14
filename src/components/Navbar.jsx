import { NavLink } from "react-router-dom";
import "../styles/layout.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          ApexGear
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/shop">
            Shop
          </NavLink>

          <NavLink to="/admin">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;