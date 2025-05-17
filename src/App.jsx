import {  Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import TestPage from "./pages/CandidateTest";
import CareerPage from "./pages/CarrerPage";
import JobPreferencesForm from "./pages/Form";
import Dashboard from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import Tests from "./pages/Tests";
import Login from "./pages/Login";
import SignOffer from "./pages/SignUpOffer";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/career/:companyName" element={<CareerPage />} />
          <Route path="/preferences" element={<JobPreferencesForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/sign-offer" element={<SignOffer />} />
          <Route path="/carrerpage" element={<CareerPage />} /> {/* Note: Possible typo in original path */}
          <Route path="/test/completed" element={<Dashboard />} /> {/* Redirect to Dashboard for simplicity */}
          <Route path="/formula" element={<JobPreferencesForm />} /> {/* Redirect to JobPreferencesForm */}
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
        </Route>
      </Routes>
  );
}

export default App;