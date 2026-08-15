import { Link } from "react-router-dom";
import { provinces } from "../../data/provinces";
import ProvinceCard from "../../components/ProvinceCard/ProvinceCard";
import SpireDivider from "../../components/SpireDivider/SpireDivider";

function FeaturedPlaces() {
  const featured = provinces.slice(0, 3);

  return (
    <section className="featured-places">
      <SpireDivider />
      <div className="section-heading" style={{ margin: "0 auto 46px", textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Popular right now
        </span>
        <h2>A few provinces travelers keep coming back to</h2>
        <p>
          Each one links out to a full guide of places to visit, eat, and
          sleep.
        </p>
      </div>

      <div className="province-grid">
        {featured.map((province) => (
          <ProvinceCard key={province.id} province={province} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Link className="btn-outline" to="/provinces">
          See all provinces
        </Link>
      </div>
    </section>
  );
}

export default FeaturedPlaces;
