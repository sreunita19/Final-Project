import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Provinces from "./pages/Provinces/Provinces.jsx";
import ProvinceDetails from "./pages/ProvinceDetails/ProvinceDetails.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AdminPortalPage from "./pages/AdminPortalPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Admin from "./pages/Admin";
import PlaceDetail from "./pages/PlaceDetail/PlaceDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/provinces" element={<Provinces />} />
      <Route path="/provinces/:id" element={<ProvinceDetails />} />
      <Route path="/provinces/:id/place/:category/:itemKey" element={<PlaceDetail />} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPortalPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;