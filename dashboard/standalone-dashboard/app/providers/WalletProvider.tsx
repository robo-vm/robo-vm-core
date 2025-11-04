'use client';

import { createConfig, WagmiProvider, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';
import { bsc, bscTestnet } from 'viem/chains';

const BSC_CHAIN = process.env.NEXT_PUBLIC_CHAIN === 'testnet' ? bscTestnet : bsc;

const config = createConfig({
  chains: [BSC_CHAIN],
  connectors: [injected()],
  transports: {
    [BSC_CHAIN.id]: http(),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

