import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content container-xl">
        <span className="eyebrow">Cambodia, province by province</span>
        <h1>
          Find where to <em>visit</em>, what to <em>eat</em>, and where to{" "}
          <em>sleep</em>
        </h1>
        <p>
          From the temples of Angkor to the beaches of the south coast — a
          practical guide built around real itineraries, not just photos.
        </p>
        <div className="hero-actions">
          <Link className="btn-gold" to="/provinces">
            Browse provinces
          </Link>
          <Link className="btn-outline" to="/register">
            Create a free account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
