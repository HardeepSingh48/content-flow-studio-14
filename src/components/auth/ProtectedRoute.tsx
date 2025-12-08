import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
