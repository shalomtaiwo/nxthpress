import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import SiteNavServer from '@/components/SiteNavServer';

export const metadata: Metadata = {
  title: 'NxthPress',
  description: 'A minimal blog CMS built with Next.js, Prisma & PostgreSQL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <SiteNavServer />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
