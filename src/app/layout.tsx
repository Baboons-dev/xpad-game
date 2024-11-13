import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { TelegramProvider } from "@/providers/TelegramProvider";
import { AppProvider } from "@/providers/AppProvider";
import Script from "next/script";
import { TopBar } from "@/components/top-bar";
import { MobileNav } from "@/components/mobile-nav";
import { Providers } from "./provider";
import theme from "@/theme";

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
    <html lang="en" className={`${inter.className} dark`}>
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
      <body
        className={inter.className}
        style={{
          height: "100vh",
          background: " #000",
        }}
      >
        <ChakraProvider>
          <Providers>
            <Suspense>
              <TelegramProvider>
                <AppProvider>
                  {children}
                  {/* <div className="h-16 md:h-0" />  */}
                </AppProvider>
              </TelegramProvider>
            </Suspense>
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
