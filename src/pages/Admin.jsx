import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import {
  fetchProvinces,
  saveProvince,
  deleteProvince,
  slugify,
} from "../services/provinces";
import "./Admin.css";

const EMPTY_PLACE = () => ({ id: "", name: "", tag: "", description: "" });

const BLANK_PROVINCE = () => ({
  id: null,
  name: "",
  khmerName: "",
  tagline: "",
  description: "",
  region: "",
  places: { visit: [], eat: [], sleep: [] },
});

const PLACE_SECTIONS = [
  { key: "visit", label: "Places to visit" },
  { key: "eat", label: "Where to eat" },
  { key: "sleep", label: "Where to sleep" },
];

function Admin() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK_PROVINCE());
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProvinces();
  }, []);

  async function loadProvinces() {
    setLoading(true);
    const data = await fetchProvinces();
    setProvinces(data);
    setLoading(false);
  }

  function selectProvince(province) {
    setStatus(null);
    setForm({
      id: province.id,
      name: province.name || "",
      khmerName: province.khmerName || "",
      tagline: province.tagline || "",
      description: province.description || "",
      region: province.region || "",
      places: {
        visit: province.places?.visit ?? [],
        eat: province.places?.eat ?? [],
        sleep: province.places?.sleep ?? [],
      },
    });
  }

  function startNewProvince() {
    setStatus(null);
    setForm(BLANK_PROVINCE());
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updatePlace(section, index, field, value) {
    setForm((prev) => {
      const list = [...prev.places[section]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, places: { ...prev.places, [section]: list } };
    });
  }

  function addPlace(section) {
    setForm((prev) => ({
      ...prev,
      places: {
        ...prev.places,
        [section]: [...prev.places[section], EMPTY_PLACE()],
      },
    }));
  }

  function removePlace(section, index) {
    setForm((prev) => {
      const list = prev.places[section].filter((_, i) => i !== index);
      return { ...prev, places: { ...prev.places, [section]: list } };
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setStatus(null);

    if (!form.name.trim()) {
      setStatus({ type: "error", message: "Province name is required." });
      return;
    }

    const id = form.id || slugify(form.name);
    if (!id) {
      setStatus({ type: "error", message: "Couldn't generate a valid id from that name." });
      return;
    }

    // Auto-assign ids to any places missing one, from their name.
    const places = {};
    for (const section of ["visit", "eat", "sleep"]) {
      places[section] = form.places[section]
        .filter((p) => p.name.trim())
        .map((p) => ({ ...p, id: p.id || slugify(p.name) }));
    }

    const { id: _drop, ...data } = { ...form, places };

    setSaving(true);
    try {
      await saveProvince(id, data);
      setStatus({ type: "success", message: `Saved "${form.name}".` });
      await loadProvinces();
      setForm({ ...form, id });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm(`Delete "${form.name}" permanently? This can't be undone.`)) return;

    setSaving(true);
    try {
      await deleteProvince(form.id);
      setStatus({ type: "success", message: `Deleted "${form.name}".` });
      await loadProvinces();
      startNewProvince();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <span className="eyebrow">Admin</span>
            <h1>Manage provinces</h1>
          </div>
          {status && (
            <span className={`admin-status ${status.type}`}>{status.message}</span>
          )}
        </div>

        <div className="admin-sidebar">
          {loading && <span className="admin-status">Loading…</span>}
          {!loading &&
            provinces.map((p) => (
              <button
                key={p.id}
                className={`admin-sidebar-item ${form.id === p.id ? "active" : ""}`}
                onClick={() => selectProvince(p)}
              >
                {p.name}
              </button>
            ))}
          <button
            className="btn btn-ghost admin-sidebar-new"
            onClick={startNewProvince}
          >
            + New province
          </button>
        </div>

        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-row">
            <div className="admin-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Battambang"
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="khmerName">Khmer name</label>
              <input
                id="khmerName"
                value={form.khmerName}
                onChange={(e) => updateField("khmerName", e.target.value)}
                placeholder="បាត់ដំបង"
              />
            </div>
          </div>

          <div className="admin-row">
            <div className="admin-field">
              <label htmlFor="region">Region</label>
              <input
                id="region"
                value={form.region}
                onChange={(e) => updateField("region", e.target.value)}
                placeholder="Northwest"
              />
            </div>
            <div className="admin-field">
              <label htmlFor="tagline">Tagline</label>
              <input
                id="tagline"
                value={form.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                placeholder="Short one-line hook shown on the province card"
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="A couple of sentences shown at the top of the province page."
            />
          </div>

          {PLACE_SECTIONS.map((section) => (
            <div key={section.key}>
              <hr className="admin-divider" />
              <div className="admin-section-title">{section.label}</div>

              {form.places[section.key].map((place, index) => (
                <div className="admin-place" key={index}>
                  <button
                    type="button"
                    className="admin-place-remove"
                    onClick={() => removePlace(section.key, index)}
                    aria-label="Remove place"
                  >
                    ×
                  </button>
                  <div className="admin-row">
                    <div className="admin-field">
                      <label>Name</label>
                      <input
                        value={place.name}
                        onChange={(e) =>
                          updatePlace(section.key, index, "name", e.target.value)
                        }
                        placeholder="Place name"
                      />
                    </div>
                    <div className="admin-field">
                      <label>Tag</label>
                      <input
                        value={place.tag}
                        onChange={(e) =>
                          updatePlace(section.key, index, "tag", e.target.value)
                        }
                        placeholder="Must-see / Local favorite / Budget…"
                      />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Description</label>
                    <textarea
                      value={place.description}
                      onChange={(e) =>
                        updatePlace(section.key, index, "description", e.target.value)
                      }
                      placeholder="A sentence or two about this place."
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="admin-add-place"
                onClick={() => addPlace(section.key)}
              >
                + Add to {section.label.toLowerCase()}
              </button>
            </div>
          ))}

          <div className="admin-actions">
            <div className="admin-actions-left">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : "Save province"}
              </button>
              <button type="button" className="btn btn-ghost" onClick={startNewProvince}>
                Clear form
              </button>
            </div>
            {form.id && (
              <button
                type="button"
                className="btn admin-danger"
                onClick={handleDelete}
                disabled={saving}
              >
                Delete province
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Admin;