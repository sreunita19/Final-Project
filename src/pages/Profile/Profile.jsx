import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { provinces } from "../../data/provinces";
import "./Profile.css";

function Profile() {
  const { currentUser, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const savedProvinces = provinces.filter((p) => favorites.includes(p.id));

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const initial =
    currentUser?.displayName?.[0]?.toUpperCase() ||
    currentUser?.email?.[0]?.toUpperCase() ||
    "?";

  return (
    <>
      <Navbar />
      <main>
      <section className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">{initial}</div>
          <div>
            <h1>{currentUser?.displayName || "Your profile"}</h1>
            <p>{currentUser?.email}</p>
          </div>
          <button className="btn-outline" onClick={handleLogout}>
            Log out
          </button>
        </div>

        <div className="section-heading">
          <span className="eyebrow">Your list</span>
          <h2>Saved provinces</h2>
        </div>

        {savedProvinces.length === 0 ? (
          <p className="profile-empty">
            You haven't saved any provinces yet — browse the{" "}
            <a href="/provinces">provinces page</a> and tap the heart icon to
            save one.
          </p>
        ) : (
          <ul className="profile-saved-list">
            {savedProvinces.map((p) => (
              <li key={p.id}>
                <a href={`/provinces/${p.id}`}>
                  <img src={p.image} alt={p.name} />
                  <span>{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
