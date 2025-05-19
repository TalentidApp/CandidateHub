import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import TestPage from "./pages/CandidateTest";
import CareerPage from "./pages/CarrerPage";
import JobPreferencesForm from "./pages/Form";
import Dashboard from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import Tests from "./pages/Tests";
import Login from "./pages/Login";
import SignOffer from "./pages/SignUpOffer";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element= {<Signup />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/career/:companyName" element={<CareerPage />} />
        <Route path="/preferences" element={<JobPreferencesForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/sign-offer" element={<SignOffer />} />
        <Route path="/carrerpage" element={<CareerPage />} />
        <Route path="/test/completed" element={<Dashboard />} />
        <Route path="/formula" element={<JobPreferencesForm />} />
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;