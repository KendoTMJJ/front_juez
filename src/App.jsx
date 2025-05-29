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
import AdminPage from "./pagesUsers/adminPage";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/problems" element={<ProblemListPage />} />
          <Route path="/problems/:id" element={<ProblemDetailPage />} />
          <Route path="/problems/create" element={<CreateProblemPage />} />
          <Route path="/problems/edit/:id" element={<EditProblemPage />} />
          <Route path="/problems/:id/submit" element={<SubmissionPage />} />
          <Route path="/submissions" element={<SubmissionListPage />} />
          <Route path="/submissions/:id" element={<SubmissionDetailPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
