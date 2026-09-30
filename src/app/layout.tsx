import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { AccountProvider } from '@/services/accountStore';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'TEYVAT AI - Your Genshin account, understood.',
  description: 'AI-powered Genshin Impact companion and account intelligence platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0d0f17] text-slate-100 antialiased">
        <AccountProvider>
          <AppShell>{children}</AppShell>
        </AccountProvider>
      </body>
    </html>
  );
}
