import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import OwnerDashboard from './pages/OwnerDashboard';
import TenantDashboard from './pages/TenantDashboard';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProperty from './pages/EditProperty';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Tenant Routes */}
          <Route 
            path="/tenant/dashboard" 
            element={
              <ProtectedRoute allowedRoles={["Tenant"]}>
                <TenantDashboard /> 
              </ProtectedRoute>
            } 
          />

          {/* Profile: Accessible by anyone logged in */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Owner Routes - CRITICAL FIX: Added the missing paths here */}
          <Route 
            path="/owner/dashboard" 
            element={
              <ProtectedRoute allowedRoles={["Property Owner"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* This matches navigate('/add-property') in your OwnerDashboard */}
          <Route 
            path="/add-property" 
            element={
              <ProtectedRoute allowedRoles={["Property Owner"]}>
                <AddProperty />
              </ProtectedRoute>
            } 
          />

          {/* This matches navigate('/edit-property/:id') in your OwnerDashboard */}
          <Route 
            path="/edit-property/:id" 
            element={
              <ProtectedRoute allowedRoles={["Property Owner"]}>
                <EditProperty />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all: Redirect to home if path doesn't exist */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



