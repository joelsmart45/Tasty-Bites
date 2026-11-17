import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('customer' | 'admin')[];
}

export function AuthGuard({
  children,
  allowedRoles,
}: AuthGuardProps) {
  const { user, isLoading, isAuthenticated, hasRole } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) return null;

  if (!isAuthenticated) {
    window.location.hash = '#/login';
    return null;
  }

  if (allowedRoles && !allowedRoles.some((role) => hasRole(role))) {
    window.location.hash = '#/login';
    return null;
  }

  return <>{children}</>;
}
