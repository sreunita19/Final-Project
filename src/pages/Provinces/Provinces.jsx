import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProvinceCard from "../../components/ProvinceCard/ProvinceCard";
import { provinces, comingSoonProvinces } from "../../data/provinces";
import "./Provinces.css";

const allProvinces = [...provinces, ...comingSoonProvinces];
const REGIONS = ["All", ...new Set(provinces.map((p) => p.region))];

function Provinces() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    return allProvinces.filter((p) => {
      const matchesRegion = region === "All" || p.region === region;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  return (
    <>
      <Navbar />
      <main>
      <section className="provinces-header">
        <span className="eyebrow">All provinces</span>
        <h1 style={{ color: "hsl(28, 73%, 60%)" }}>Pick a province to start planning</h1>
        <p style={{ color: "#aba1a1"}}>Filter by region or search by name.</p>

        <div className="provinces-controls">
          <input
            type="search"
            placeholder="Search provinces…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search provinces"
          />

          <div className="region-pills">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                className={`region-pill ${region === r ? "is-active" : ""}`}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="provinces-list">
        {filtered.length === 0 ? (
          <p className="provinces-empty">
            No provinces match "{query}". Try a different search.
          </p>
        ) : (
          <div className="province-grid">
            {filtered.map((province) => (
              <ProvinceCard key={province.id} province={province} />
            ))}
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Provinces;
