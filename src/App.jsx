import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Route and BrowserRouter correctly
import './App.css';
import Header from './components/Header';
import LoginPage from '../src/pages/loginPage';
import AdminPage from './pages/adminPage';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/registerPage';
import TestPage from './pages/testPages';
import Home from './pages/home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from './pages/foretPassword';
import SellerDashboard from './pages/seller/sellerDashboard';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <div>
          <Toaster position='top-center' />
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget" element={<ForgotPassword />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/seller/*" element={<SellerDashboard />} />

            <Route path="/test" element={<TestPage />} />

            {/* 404 Page Not Found */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

