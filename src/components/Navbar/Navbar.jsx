import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    close();
    navigate("/");
  };

  return (
    <header className="site-nav">
      <div className="site-nav-inner container-xl">
        <Link className="brand" to="/" onClick={close}>
          <img src="/provinces-images/cover.jpg" alt="Explore Cambodia logo" className="cover-logo"/>
          <span className="brand-text">Explore Cambodia</span>
        </Link>

        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/provinces" onClick={close}>Provinces</NavLink>
          <NavLink to="/favorites" onClick={close}>Favorites</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>

          {currentUser ? (
            <>
              <NavLink to="/profile" onClick={close}>Profile</NavLink>
              <button className="nav-cta" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={close}>Login</NavLink>
              <Link className="nav-cta" to="/register" onClick={close}>
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
