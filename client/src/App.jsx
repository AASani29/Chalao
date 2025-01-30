import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Exam from './components/ExamComponents/Exam';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminLicense from './pages/AdminLicense';
import AdminUsers from './pages/AdminUsers';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import License from './pages/License';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/licensepage" element={<License />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/licenses" element={<AdminLicense />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
