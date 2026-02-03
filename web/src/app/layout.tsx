// src/app/layout.tsx

import { AuthProvider } from '@/modules/auth/auth.context';
import NavBar from '@/components/navbar/Navbar';
import { I18nProvider } from '@/i18n/I18nProvider';
import '@xyflow/react/dist/style.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <I18nProvider>
          <AuthProvider>
            <main className="flex flex-col gap-17">
              <header>
                <NavBar />
              </header>

              {children}
            </main>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
