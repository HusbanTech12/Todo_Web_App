import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import '@/styles/globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'A secure todo application with authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}