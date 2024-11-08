import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Suspense} from 'react';
import './globals.css';
import {TelegramProvider} from '@/providers/TelegramProvider';
import {ReduxProvider} from "@/redux/provider";
import {AppProvider} from "@/providers/AppProvider";
import { MobileNav } from '@/components/mobile-nav';
import { TopBar } from '@/components/top-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Xpad Game',
  description: 'Ultimate Fighter Championship on Xpad',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <ReduxProvider>
            <Suspense>
                <TelegramProvider>
                    <body className={inter.className}>
                    <AppProvider>
                        <TopBar/>
                        <div className="pt-16"> {/* Spacer for top bar */}
                            {children}
                        </div>
                        <MobileNav/>
                        <div className="h-16 md:h-0"/>
                    </AppProvider>
                    </body>
                </TelegramProvider>
            </Suspense>
        </ReduxProvider>

        </html>
    );
}
