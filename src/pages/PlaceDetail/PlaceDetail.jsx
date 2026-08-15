import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getProvinceById } from "../../data/provinces";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { isAdmin } from "../../utils/isAdmin";
import { getItemKey } from "../../utils/placeKey";
import "./PlaceDetail.css";

const CATEGORY_LABELS = {
  visit: "Place to visit",
  eat: "Where to eat",
  sleep: "Where to sleep",
};

function PlaceDetail() {
  const { id, category, itemKey } = useParams();
  const province = getProvinceById(id);
  const { currentUser } = useAuth();
  const admin = isAdmin(currentUser);

  // Every place (built-in + admin-added) for this category, so we can find
  // the one matching itemKey in the URL.
  const [extras, setExtras] = useState(null); // null = still loading

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province?.id]);

  const categoryValid = !!CATEGORY_LABELS[category];
  const combinedList =
    categoryValid && province && extras
      ? [...province[category], ...extras[category]]
      : null;

  const item = combinedList?.find((it, idx) => getItemKey(it, idx) === itemKey);

  // Content shown on the page — starts as the item's built-in copy, then
  // gets overridden by whatever's saved in Firestore for this exact item.
  const [longDescription, setLongDescription] = useState("");
  const [gallery, setGallery] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftDescription, setDraftDescription] = useState("");
  const [draftGallery, setDraftGallery] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const docId = item ? `${id}_${category}_${itemKey}` : null;

  useEffect(() => {
    if (!item || !docId) return;

    let cancelled = false;
    setContentLoading(true);

    const defaultDescription = item.longDescription || item.note;
    const defaultGallery = item.gallery?.length
      ? item.gallery
      : [item.image].filter(Boolean);

    getDoc(doc(db, "placeHighlights", docId))
      .then((snap) => {
        if (cancelled) return;
        if (snap.exists()) {
          const data = snap.data();
          setLongDescription(data.longDescription || defaultDescription);
          setGallery(data.gallery?.length ? data.gallery : defaultGallery);
        } else {
          setLongDescription(defaultDescription);
          setGallery(defaultGallery);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLongDescription(defaultDescription);
          setGallery(defaultGallery);
        }
      })
      .finally(() => {
        if (!cancelled) setContentLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

  if (!province || !categoryValid) {
    return <Navigate to="/provinces" replace />;
  }

  if (combinedList === null) {
    return (
      <>
        <Navbar />
        <main>
          <section className="province-loading">
            <div className="province-loading-spinner" />
            <p>Loading…</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!item) {
    return <Navigate to={`/provinces/${province.id}`} replace />;
  }

  const startEditing = () => {
    setDraftDescription(longDescription);
    setDraftGallery(gallery);
    setNewImageUrl("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const addImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    setDraftGallery((prev) => [...prev, url]);
    setNewImageUrl("");
  };

  const removeImage = (index) => {
    setDraftGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "placeHighlights", docId), {
        longDescription: draftDescription,
        gallery: draftGallery,
        updatedAt: new Date().toISOString(),
      });
      setLongDescription(draftDescription);
      setGallery(draftGallery);
      setEditing(false);
    } catch (err) {
      alert("Couldn't save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section
          className="place-hero"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="place-hero-overlay">
            <Link to={`/provinces/${province.id}`} className="back-link">
              ← Back to {province.name}
            </Link>
            <span className="eyebrow">{CATEGORY_LABELS[category]}</span>
            <h1>{item.name}</h1>
            <p>{item.note}</p>
          </div>
        </section>

        <section className="place-body">
          {contentLoading ? (
            <p className="place-description">Loading…</p>
          ) : editing ? (
            <div className="place-editor">
              <label className="place-editor-label" htmlFor="place-description-input">
                Description
              </label>
              <textarea
                id="place-description-input"
                className="place-editor-textarea"
                value={draftDescription}
                onChange={(e) => setDraftDescription(e.target.value)}
                rows={8}
              />

              <label className="place-editor-label">Photos</label>
              <div className="place-editor-gallery">
                {draftGallery.map((src, i) => (
                  <div key={i} className="place-editor-thumb">
                    <img
                      src={src}
                      alt={`Photo ${i + 1}`}
                      onClick={() => setLightboxSrc(src)}
                      style={{ cursor: "zoom-in" }}
                    />
                    <button
                      type="button"
                      className="place-editor-remove"
                      onClick={() => removeImage(i)}
                      aria-label="Remove photo"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="place-editor-add-row">
                <input
                  type="url"
                  placeholder="Paste an image URL…"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="place-editor-input"
                />
                <button type="button" className="btn-outline" onClick={addImage}>
                  Add photo
                </button>
              </div>

              <div className="place-editor-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={saveChanges}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  className="place-editor-cancel"
                  onClick={cancelEditing}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="place-description">{longDescription}</p>

              <div className="place-gallery">
                {gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${item.name} photo ${i + 1}`}
                    loading="lazy"
                    onClick={() => setLightboxSrc(src)}
                    style={{ cursor: "zoom-in" }}
                  />
                ))}
              </div>

              <div className="place-body-actions">
                <Link to={`/provinces/${province.id}`} className="btn-outline">
                  ← Back to {province.name}
                </Link>

                {admin && (
                  <button
                    type="button"
                    className="place-edit-toggle"
                    onClick={startEditing}
                  >
                    ✎ Edit this page
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </main>

      {lightboxSrc && (
        <div className="lightbox-backdrop" onClick={() => setLightboxSrc(null)}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt="Full size preview"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </>
  );
}

export default PlaceDetail;