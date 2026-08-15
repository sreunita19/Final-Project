import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";

// Placeholder admin view — wire this up to a Firestore "provinces" collection
// if you want editing to happen through the UI instead of data/provinces.js.
function AdminPortalPage() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <section style={{ padding: "70px 8%", minHeight: "50vh" }}>
        <span className="eyebrow">Admin</span>
        <h1 style={{ margin: "14px 0 10px" }}>Admin dashboard</h1>
        <p style={{ color: "var(--muted)" }}>
          Signed in as {currentUser?.email || "guest"}. Province content
          currently lives in <code>src/data/provinces.js</code>.
        </p>
      </section>
      <Footer />
    </>
  );
}

export default AdminPortalPage;
