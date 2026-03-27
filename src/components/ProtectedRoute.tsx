import { useAuth } from '@clerk/react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();

  // While Clerk is loading session, render nothing (avoids flash)
  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
