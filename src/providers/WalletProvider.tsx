"use client";

import { projectId, wagmiAdapter } from "@/utils/wallet-configs";
import { sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "xpad-game",
  description: "AppKit Example",
  url: "https://xplay.baboons.tech", // origin must match your domain & subdomain
  icons: ["https://xplay.baboons.tech/logo.png"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  // also change in utils/wallet-configs.ts
  networks: [sepolia],
  defaultNetwork: sepolia,
  metadata: metadata,
});

function WalletProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  // const isIOS = () => {
  //   // Refined iOS detection
  //   return (
  //     /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  //   );
  // };
  //
  // useEffect(() => {
  //   if (window) {
  //     window.open = (function (open) {
  //       return function (url, _, features) {
  //         if (isIOS() && typeof url === "string") {
  //           // setLink(url);
  //           // setOpen(true);
  //
  //           console.log("url>>>>>>>>>>>>>>>>>", url);
  //           return null;
  //         }
  //         return open.call(window, url, "_blank", features);
  //       };
  //     })(window.open);
  //   }
  // }, []);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default WalletProvider;
