import { provinces } from "../../data/provinces";

// Pulls one "sleep" suggestion from each of a few provinces to give a taste
// of the kind of stays covered on each province's detail page.
function PopularHotels() {
  const picks = provinces.slice(0, 4).map((p) => ({
    province: p.name,
    id: p.id,
    stay: p.sleep[0],
    image: p.image,
  }));

  return (
    <section className="stays">
      <div
        className="section-heading"
        style={{ margin: "0 auto 46px", textAlign: "center" }}
      >
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Where to sleep
        </span>
        <h2>A starting point for every budget</h2>
        <p>
          Full lists of stay areas — from beach bungalows to riverside
          guesthouses — live on each province's page.
        </p>
      </div>

      <div className="stays-grid">
        {picks.map((pick) => (
          <a key={pick.id} href={`/provinces/${pick.id}`} className="stay-card">
            <img src={pick.image} alt={pick.province} loading="lazy" />
            <div className="stay-card-body">
              <span className="stay-card-province">{pick.province}</span>
              <h3>{pick.stay.name}</h3>
              <p>{pick.stay.note}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default PopularHotels;
