import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { Env } from '@/libs/Env';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel for Military Memorial',
  robots: 'noindex, nofollow, noimageindex',
  openGraph: {
    title: 'Admin Panel',
    description: 'Admin Panel for Military Memorial',
    type: 'website',
    siteName: 'Admin Panel',
    url: Env.APP_URL,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
