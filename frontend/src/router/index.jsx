import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Fuel from '../pages/Fuel.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute roles={['admin', 'manager', 'employee']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fuel"
        element={
          <ProtectedRoute roles={['admin', 'manager', 'employee']}>
            <Fuel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
