// src/app/layout.tsx

import { AuthProvider } from '@/modules/auth/auth.context';
import './globals.css';
import NavBar from '@/components/navbar/Navbar';
import { I18nProvider } from '@/i18n/I18nProvider';
import { ToastProvider } from '@/components/toast/ToastProvider';

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
            <ToastProvider>
              <AuthProvider>
                <main className="flex flex-col gap-24">
                  <header>
                    <NavBar />
                  </header>

                  {children}
                </main>
                </AuthProvider>
              </ToastProvider>
          </I18nProvider>
        </main>
      </body>
    </html>
  );
}
