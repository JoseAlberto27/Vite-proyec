import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
import { ROUTES } from '@routes/routePaths.js';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return children;
}
