import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProvinceCard from "../../components/ProvinceCard/ProvinceCard";
import { useFavorites } from "../../context/FavoritesContext";
import { provinces } from "../../data/provinces";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useFavorites();
  const saved = provinces.filter((p) => favorites.includes(p.id));

  return (
    <>
      <Navbar />
      <main>
      <section className="favorites-page">
       <div
          className="section-heading"
          style={{ margin: "0 auto 46px", textAlign: "center" }}
        >
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Your trip list
          </span>
          <h1 style={{ color: "hsl(28, 73%, 60%)" }}>Favorites</h1>
          <p style={{ color: "#aba1a1" }}>
            Provinces you've saved for later — tap the heart on any card to
            add or remove one.
          </p>
        </div>

        {saved.length === 0 ? (
          <div className="favorites-empty">
            <p>No favorites yet.</p>
            <Link className="btn-gold" to="/provinces">
              Browse provinces
            </Link>
          </div>
        ) : (
          <div className="province-grid">
            {saved.map((p) => (
              <ProvinceCard key={p.id} province={p} />
            ))}
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
