import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Suspense} from 'react';
import './globals.css';
import {TelegramProvider} from '@/providers/TelegramProvider';
import {AppProvider} from "@/providers/AppProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Xpad Game',
  description: 'Ultimate Fighter Championship on Xpad',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Suspense>
                <TelegramProvider>
                    <body className={inter.className}>
                    <AppProvider>
                            {children}
                    </AppProvider>
                    </body>
                </TelegramProvider>
            </Suspense>

        </html>
    );
}
