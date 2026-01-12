import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App Phase II',
  description: 'A secure todo application with authentication',
  keywords: 'todo, tasks, productivity, authentication, secure',
  authors: [{ name: 'Todo App Team' }],
  creator: 'Todo App Team',
  publisher: 'Todo App Team',
  openGraph: {
    title: 'Todo App Phase II',
    description: 'A secure todo application with authentication',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo App Phase II',
    description: 'A secure todo application with authentication',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}