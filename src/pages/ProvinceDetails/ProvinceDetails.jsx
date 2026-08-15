import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SpireDivider from "../../components/SpireDivider/SpireDivider";
import { getProvinceById } from "../../data/provinces";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import { isAdmin } from "../../utils/isAdmin";
import { getItemKey } from "../../utils/placeKey";
import { db } from "../../firebase";
import "./ProvinceDetail.css";

// Small inline form for adding a brand-new place to a Visit/Eat/Sleep list.
function AddPlaceForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onAdd({ name: name.trim(), note: note.trim(), image: image.trim() });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-place-form">
      <input
        type="text"
        placeholder="Name (e.g. Sunset Rooftop Bar)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="add-place-input"
      />
      <input
        type="text"
        placeholder="Short note (e.g. Best sunset views in town)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="add-place-input"
      />
      <input
        type="url"
        placeholder="Photo URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="add-place-input"
      />
      <div className="add-place-actions">
        <button
          type="button"
          className="btn-outline"
          onClick={submit}
          disabled={saving || !name.trim()}
        >
          {saving ? "Adding…" : "Add place"}
        </button>
        <button type="button" className="add-place-cancel" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// Every place — built-in or user-added — now links to its own full detail
// page, where the description and photos can be edited.
function InfoList({
  title,
  items,
  icon,
  fallbackImage,
  provinceId,
  category,
  canManage,
  onAddPlace,
  onRemovePlace,
}) {
  const [adding, setAdding] = useState(false);

  return (
    <div className="info-block">
      <h3>
        <span className="info-icon">{icon}</span> {title}
      </h3>
      <ul>
        {items.map((item, index) => {
          const key = getItemKey(item, index);

          const removeButton = canManage && item.isExtra && (
            <button
              type="button"
              className="info-item-remove"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemovePlace(item.id);
              }}
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          );

          return (
            <li key={key} className="info-item">
              <Link
                to={`/provinces/${provinceId}/place/${category}/${key}`}
                className="info-item-trigger"
              >
                <img
                  src={item.image || fallbackImage}
                  alt={item.name}
                  className="info-item-photo"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallbackUsed && fallbackImage) {
                      e.currentTarget.dataset.fallbackUsed = "true";
                      e.currentTarget.src = fallbackImage;
                    } else {
                      e.currentTarget.style.display = "none";
                    }
                  }}
                />
                <div className="info-item-text">
                  <span className="info-item-name">
                    {item.name}
                    <span className="info-item-badge">More detail</span>
                  </span>
                  <span className="info-item-note">{item.note}</span>
                </div>
              </Link>
              {removeButton}
            </li>
          );
        })}
      </ul>

      {canManage && (
        adding ? (
          <AddPlaceForm
            onAdd={async (item) => {
              await onAddPlace(item);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <button type="button" className="add-place-toggle" onClick={() => setAdding(true)}>
            + Add a place
          </button>
        )
      )}
    </div>
  );
}

function ProvinceDetails() {
  const { id } = useParams();
  const province = getProvinceById(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { currentUser } = useAuth();
  const admin = isAdmin(currentUser);

  const [loading, setLoading] = useState(true);

  // User-added places, stored in Firestore separately from the built-in
  // provinces.js data, keyed by province id.
  const [extras, setExtras] = useState({ visit: [], eat: [], sleep: [] });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (!province) return;
    let cancelled = false;

    getDoc(doc(db, "provinceExtras", province.id))
      .then((snap) => {
        if (cancelled) return;
        const data = snap.exists() ? snap.data() : {};
        const toList = (obj) =>
          obj ? Object.entries(obj).map(([extraId, item]) => ({ ...item, id: extraId, isExtra: true })) : [];
        setExtras({
          visit: toList(data.visit),
          eat: toList(data.eat),
          sleep: toList(data.sleep),
        });
      })
      .catch(() => {
        if (!cancelled) setExtras({ visit: [], eat: [], sleep: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [province?.id]);

  if (!province) {
    return <Navigate to="/provinces" replace />;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main>
          <section className="province-loading">
            <div className="province-loading-spinner" />
            <p>Loading {province.name}…</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const favorited = isFavorite(province.id);

  const addPlace = async (category, item) => {
    const extraId = `extra_${Date.now()}`;
    await setDoc(
      doc(db, "provinceExtras", province.id),
      { [category]: { [extraId]: item } },
      { merge: true }
    );
    setExtras((prev) => ({
      ...prev,
      [category]: [...prev[category], { ...item, id: extraId, isExtra: true }],
    }));
  };

  const removePlace = async (category, extraId) => {
    await updateDoc(doc(db, "provinceExtras", province.id), {
      [`${category}.${extraId}`]: deleteField(),
    });
    setExtras((prev) => ({
      ...prev,
      [category]: prev[category].filter((i) => i.id !== extraId),
    }));
  };

  // Make sure Visit / Eat / Sleep are always arrays
  const visitPlaces = Array.isArray(province.visit)
    ? province.visit
    : [];

  const eatPlaces = Array.isArray(province.eat)
    ? province.eat
    : [];

  const sleepPlaces = Array.isArray(province.sleep)
    ? province.sleep
    : [];

  // Combine built-in places with admin-added places
  const fullVisit = [...visitPlaces, ...extras.visit];
  const fullEat = [...eatPlaces, ...extras.eat];
  const fullSleep = [...sleepPlaces, ...extras.sleep];
  return (
    <>
      <Navbar />
      <main>
        <section className="province-hero" style={{ backgroundImage: `url(${province.image})` }}>
          <div className="province-hero-overlay">
            <Link to="/provinces" className="back-link">← All provinces</Link>
            <span className="eyebrow">{province.region}</span>
            <h1>{province.name}</h1>
            <p>{province.tagline}</p>

            <button
              type="button"
              className={`btn-outline fav-toggle ${favorited ? "is-active" : ""}`}
              onClick={() => toggleFavorite(province.id)}
            >
              {favorited ? "♥ Saved to favorites" : "♡ Save to favorites"}
            </button>
          </div>
        </section>

        {province.comingSoon ? (
          <section className="province-body">
            <div className="coming-soon-block">
              <span className="coming-soon-icon">🚧</span>
              <h2>We're still putting this guide together</h2>
              <p>
                Places to visit, eat, and sleep in {province.name} are on the
                way. Check back soon, or explore a province that's ready now.
              </p>
              <Link to="/provinces" className="btn-outline">
                ← Browse other provinces
              </Link>
            </div>
          </section>
        ) : (
          <section className="province-body">
            <p className="province-description">{province.description}</p>

            <SpireDivider />

            <div className="info-grid">
              <InfoList
                title="Places to visit"
                items={fullVisit}
                icon="⛩"
                fallbackImage={province.image}
                provinceId={province.id}
                category="visit"
                canManage={admin}
                onAddPlace={(item) => addPlace("visit", item)}
                onRemovePlace={(extraId) => removePlace("visit", extraId)}
              />
              <InfoList
                title="Where to eat"
                items={fullEat}
                icon="🍲"
                fallbackImage={province.image}
                provinceId={province.id}
                category="eat"
                canManage={admin}
                onAddPlace={(item) => addPlace("eat", item)}
                onRemovePlace={(extraId) => removePlace("eat", extraId)}
              />
              <InfoList
                title="Where to sleep"
                items={fullSleep}
                icon="🛏"
                fallbackImage={province.image}
                provinceId={province.id}
                category="sleep"
                canManage={admin}
                onAddPlace={(item) => addPlace("sleep", item)}
                onRemovePlace={(extraId) => removePlace("sleep", extraId)}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ProvinceDetails;