import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineChain, sepolia } from '@reown/appkit/networks';
import { cookieStorage, createStorage } from '@wagmi/core';

// Get projectId from https://cloud.reown.com
export const projectId = '812502bab4b58307bcf65fbb7f78356e';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const layerXNetwork_test = defineChain({
  id: 232232,
  caipNetworkId: 'eip155:232232',
  chainNamespace: 'eip155',
  name: 'LayerX',
  nativeCurrency: {
    decimals: 18,
    name: 'LayerX',
    symbol: 'LuX',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.layerxscan.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.layerxscan.com' },
  },
});

export const defaultNetwork = layerXNetwork_test;

export const networks = [layerXNetwork_test, sepolia];

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
