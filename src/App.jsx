import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import MarketplacePage from './pages/MarketplacePage';
import AgriStorePage from './pages/AgriStorePage';
import InsurancePage from './pages/InsurancePage';
import ChatSupportPage from './pages/ChatSupportPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/store" element={<AgriStorePage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/chat" element={<ChatSupportPage />} />

          {/* Farmer Protected */}
          <Route path="/farmer" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/farmer/listings" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/farmer/upload" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/farmer/orders" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />

          {/* Buyer Protected */}
          <Route path="/buyer" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/buyer/orders" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
