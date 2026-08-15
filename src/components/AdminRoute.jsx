import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdmin } from "../utils/isAdmin";

function AdminRoute({ children }) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return <div className="page-loading">Loading…</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin(currentUser)) {
    return <Navigate to="/provinces" replace />;
  }

  return children;
}

export default AdminRoute;