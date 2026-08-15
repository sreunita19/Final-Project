import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Wrap any route element that should require a logged-in user, e.g.
// <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return <div className="page-loading">Loading…</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
