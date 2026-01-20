// src/app/layout.tsx

import { AuthProvider } from '@/modules/auth/auth.context';
import './globals.css';
import NavBar from '@/components/Navbar';
import { I18nProvider } from '@/i18n/I18nProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <main>
          <I18nProvider>
            <AuthProvider>
              <main className="flex flex-col gap-24">
                <header>
                  <NavBar />
                </header>

                {children}
              </main>
            </AuthProvider>
          </I18nProvider>
        </main>
      </body>
    </html>
  );
}
