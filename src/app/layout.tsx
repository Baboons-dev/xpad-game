import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { TelegramProvider } from "@/providers/TelegramProvider";
import { AppProvider } from "@/providers/AppProvider";
import Script from "next/script";
import { TopBar } from "@/components/top-bar";
import { MobileNav } from "@/components/mobile-nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xpad Game",
  description: "Ultimate Fighter Championship on Xpad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </head>
      <Suspense>
        <TelegramProvider>
          <body className={inter.className}>
            {/* <TopBar /> */}
            {/* <div>{children}</div> */}
            <AppProvider>{children}</AppProvider>
            <MobileNav />
            <div className="h-16 md:h-0" /> {/* Spacer for mobile nav */}
          </body>
        </TelegramProvider>
      </Suspense>
    </html>
  );
}
