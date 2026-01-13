'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the tasks page if authenticated, or to login if not
    const token = localStorage.getItem('auth-token');
    if (token) {
      router.push('/tasks');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Todo App</h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}