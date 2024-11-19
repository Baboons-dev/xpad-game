import { AppProvider } from "@/providers/AppProvider";
import { TelegramProvider } from "@/providers/TelegramProvider";
import WalletProvider from "@/providers/WalletProvider";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./provider";

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
  const cookies = headers().get("cookie");

  return (
    <html lang="en" className={`${inter.className} dark`}>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
          background: "#000",
          paddingTop: "64px", // Add padding to account for fixed TopBar
          paddingBottom: "80px", // Add padding to account for mobile navigation
        }}
      >
        <ChakraProvider>
          <Providers>
            <Suspense>
              <WalletProvider cookies={cookies}>
                <TelegramProvider>
                  <AppProvider>{children}</AppProvider>
                </TelegramProvider>
              </WalletProvider>
            </Suspense>
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
