import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner container-xl">
        <div className="footer-col footer-brand">
          <span className="brand-text">Explore Cambodia</span>
          <p>
            A traveler's guide to every province — what to see, what to eat,
            and where to sleep.
          </p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/provinces">Provinces</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <div className="footer-col">
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col footer-social">
          <h3>Follow</h3>
          <div className="social">
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/social-images/facebook.png" alt="Facebook" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/social-images/tik.png" alt="TikTok" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/social-images/ig.png" alt="Instagram" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/social-images/tele.png" alt="Telegram" />
            </a>
          </div>
        </div>
      </div>

      <p className="footer-bottom">
         {new Date().getFullYear()} Explore Cambodia. Built for travelers, by travelers.
      </p>
    </footer>
  );
}

export default Footer;
