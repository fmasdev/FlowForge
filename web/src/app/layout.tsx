// src/app/layout.tsx

import { AuthProvider } from '@/modules/auth/auth.context';
import NavBar from '@/components/navbar/Navbar';
import { I18nProvider } from '@/i18n/I18nProvider';
import { NotificationProvider } from '@/components/notification/NotificationProvider';
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
        <main>
          <I18nProvider>
            <NotificationProvider>
              <AuthProvider>
                <main className="flex flex-col gap-24">
                  <header>
                    <NavBar />
                  </header>

                  {children}
                </main>
                </AuthProvider>
              </NotificationProvider>
          </I18nProvider>
        </main>
      </body>
    </html>
  );
}
