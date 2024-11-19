import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sepolia } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "@wagmi/core";

// Get projectId from https://cloud.reown.com
export const projectId = "812502bab4b58307bcf65fbb7f78356e";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// also change in providers/WalletProvider.tsx
export const networks = [sepolia];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
