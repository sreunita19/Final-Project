import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import "./ProvinceCard.css";

function ProvinceCard({ province }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(province.id);

  return (
    <div className="province-card">
      <Link to={`/provinces/${province.id}`} className="province-card-media">
        <img src={province.image} alt={province.name} loading="lazy" />
        <span className="province-card-region">{province.region}</span>
        {province.comingSoon &&(
          <span className="province-card-badge">Coming soon</span>
        )}
        
      </Link>

      <button
        type="button"
        className={`province-card-fav ${favorited ? "is-active" : ""}`}
        onClick={() => toggleFavorite(province.id)}
        aria-pressed={favorited}
        aria-label={
          favorited ? `Remove ${province.name} from favorites` : `Save ${province.name} to favorites`
        }
      >
        ♥
      </button>

      <div className="province-card-body">
        <h3>
          <Link to={`/provinces/${province.id}`}>{province.name}</Link>
        </h3>
        <p>{province.tagline}</p>
      </div>
    </div>
  );
}

export default ProvinceCard;
