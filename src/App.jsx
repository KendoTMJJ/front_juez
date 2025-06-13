import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProblemListPage from "./pages/ProblemListPage";
import ProblemDetailPage from "./pages/ProblemDetailPage";
import SubmissionPage from "./pages/SubmissionPage";
import SubmissionListPage from "./pages/SubmissionListPage";
import SubmissionDetailPage from "./pages/SubmissionDetailPage";
import CreateProblemPage from "./pages/CreateProblemPage";
import EditProblemPage from "./pages/EditProblemPage";
import RankingsPage from "./pages/RankingsPage";
import Login from "./pagesUsers/loginPage";
import Register from "./pagesUsers/registerPage";
import ProfilePage from "./pagesUsers/profilePage";
import Footer from "./components/Footer";
import EditProfilePage from "./pagesUsers/EditProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteHome from "./components/ProtectedRouteHome";
import AdminPage from "./pagesUsers/AdminPage";

import { useAuth } from "./context/AuthContext";
import { isAdmin, isMaster } from "./servicesUsuarios/authService";

function App() {
  const { token } = useAuth();

  const isAuthenticated = !!token;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/problems" element={<ProblemListPage />} />
          <Route path="/problems/:id" element={<ProblemDetailPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                element={<ProfilePage />}
              />
            }
          />

          <Route
            path="/edit-profile/:id"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                element={<EditProfilePage />}
              />
            }
          />

          <Route
            path="/problems/:id/submit"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                element={<SubmissionPage />}
              />
            }
          />

          <Route
            path="/submissions"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                element={<SubmissionListPage />}
              />
            }
          />

          <Route
            path="/submissions/:id"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                element={<SubmissionDetailPage />}
              />
            }
          />

          {/* Protegidas: solo Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRouteHome
                isAllowed={isAuthenticated && isAdmin()}
                element={<AdminPage />}
              />
            }
          />

          {/* Protegidas: Admin o Master */}
          <Route
            path="/problems/create"
            element={
              <ProtectedRouteHome
                isAllowed={isAuthenticated && (isAdmin() || isMaster())}
                element={<CreateProblemPage />}
              />
            }
          />

          <Route
            path="/problems/edit/:id"
            element={
              <ProtectedRouteHome
                isAllowed={isAuthenticated && (isAdmin() || isMaster())}
                element={<EditProblemPage />}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
