'use client';

import { AuthProvider } from '@/modules/auth/auth.context';
import './globals.css';
import NavBar from '@/components/Navbar';
import '@/i18n';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <AuthProvider>
          <main>
            <header>
              <NavBar />
            </header>

            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
