import {MobileNav} from '@/components/mobile-nav';
import {TopBar} from '@/components/top-bar';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Suspense} from 'react';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Xpad Game',
  description: 'Ultimate Fighter Championship on Xpad',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <Suspense>
        <body className={inter.className}>
          <TopBar />
          <div className="pt-16">
            {' '}
            {/* Spacer for top bar */}
            {children}
          </div>
          <MobileNav />
          <div className="h-16 md:h-0" /> {/* Spacer for mobile nav */}
        </body>
      </Suspense>
    </html>
  );
}
