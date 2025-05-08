import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import QuizPage from "./components/common/SingleQuiz";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PropTypes from "prop-types";
import CarrerPage from "./pages/CarrerPage";
import SignUpOffer from "./pages/SignUpOffer";
import Dashboard from "./pages/HomePage"; 
import useAuthStore from "./constants/store";
import TestCompleted from "./pages/CompletedTest";
import TestPage from "./pages/Test";
import NotFound from "./pages/NotFound";
import FormulaDocumentation from "./pages/Form";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career/:companyName" element={<CarrerPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/singleQuiz" element={<QuizPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sign-offer" element={<SignUpOffer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/test/completed" element={<TestCompleted />} />
        <Route path="/formula" element={<FormulaDocumentation />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;