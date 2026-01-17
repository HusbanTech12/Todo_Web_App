'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  )
}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Show loading state while checking authentication
  if (loading) {
    return fallback;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Redirect to login page
    router.replace('/login');
    return null; // Return null to prevent rendering children
  }

  // Render children if authenticated
  return <>{children}</>;
};

export { ProtectedRoute };