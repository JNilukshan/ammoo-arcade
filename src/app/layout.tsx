
'use client'

import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';


function AppContent({ children }: { children: React.ReactNode }) {
  const { user, viewMode } = useAuth();
  const pathname = usePathname();

  const showHeader = !pathname.startsWith('/admin') && viewMode === 'buying' && !pathname.startsWith('/dashboard');

  return (
    <div className="relative flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main className="flex-1 flex-grow">
        {children}
      </main>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Creator Commerce Launchpad</title>
        <meta name="description" content="Your one-stop shop for influencer merchandise." />
      </head>
      <body className={cn("relative h-full font-body antialiased")}>
        <AuthProvider>
          <AppContent>
            {children}
          </AppContent>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
