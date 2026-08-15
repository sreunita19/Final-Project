import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

// Built-in starter testimonials — always shown first, before anything
// travelers submit themselves.
const builtInTestimonials = [
  {
    quote:
      "Having the eat and sleep suggestions right next to the temple list saved us so much planning time.",
    name: "Maya R.",
    trip: "2 weeks — Siem Reap & Kampot",
  },
  {
    quote:
      "We used the province pages like a checklist. Bou Sra Waterfall alone was worth the trip north.",
    name: "Theo & Anh",
    trip: "10 days — Mondulkiri & Phnom Penh",
  },
  {
    quote:
      "Simple, honest descriptions — no fluff. Told us exactly what each place was actually like.",
    name: "Sarah K.",
    trip: "1 week — coastal provinces",
  },
];

function ShareForm({ onSubmit }) {
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [trip, setTrip] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!quote.trim() || !name.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ quote: quote.trim(), name: name.trim(), trip: trip.trim() });
      setQuote("");
      setName("");
      setTrip("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="testimonial-form">
      <textarea
        className="testimonial-input"
        placeholder="What was your trip like? Share a tip or highlight…"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        rows={3}
      />
      <div className="testimonial-form-row">
        <input
          type="text"
          className="testimonial-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="testimonial-input"
          placeholder="Trip length & provinces (optional)"
          value={trip}
          onChange={(e) => setTrip(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn-gold"
        onClick={submit}
        disabled={saving || !quote.trim() || !name.trim()}
      >
        {saving ? "Sharing…" : "Share your experience"}
      </button>
    </div>
  );
}

function Testimonials() {
  const { currentUser } = useAuth();
  const [submitted, setSubmitted] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setSubmitted(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      () => setSubmitted([])
    );
    return () => unsubscribe();
  }, []);

  const addTestimonial = async ({ quote, name, trip }) => {
    await addDoc(collection(db, "testimonials"), {
      quote,
      name,
      trip: trip || "Explore Cambodia traveler",
      createdAt: serverTimestamp(),
    });
    setShowForm(false);
  };

  const allTestimonials = [...builtInTestimonials, ...submitted];

  return (
    <section className="testimonials">
     <div
        className="section-heading"
        style={{ margin: "0 auto 46px", textAlign: "center" }}
      >
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Travelers say
        </span>
        <h2>Planned with this guide</h2>
      </div>

      <div className="testimonials-grid">
        {allTestimonials.map((t) => (
          <blockquote key={t.id || t.name} className="testimonial-card">
            <p>&ldquo;{t.quote}&rdquo;</p>
            <footer>
              <span className="t-name">{t.name}</span>
              <span className="t-trip">{t.trip}</span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="testimonial-share">
        {currentUser ? (
          showForm ? (
            <ShareForm onSubmit={addTestimonial} />
          ) : (
            <button type="button" className="btn-outline" onClick={() => setShowForm(true)}>
              + Share your experience
            </button>
          )
        ) : (
          <p className="testimonial-login-hint">
            <Link to="/login">Log in</Link> to share your own trip experience.
          </p>
        )}
      </div>
    </section>
  );
}

export default Testimonials;