'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';

export default function WalletInfo() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const rvmTokenAddress = process.env.NEXT_PUBLIC_RVM_TOKEN_ADDRESS;
  
  const { data: bnbBalance } = useBalance({
    address,
    enabled: isConnected && !!address,
  });

  const { data: rvmBalance } = useBalance({
    address,
    token: rvmTokenAddress && rvmTokenAddress !== '0x0000000000000000000000000000000000000000' 
      ? rvmTokenAddress as `0x${string}` 
      : undefined,
    enabled: isConnected && !!address && !!rvmTokenAddress,
  });

  if (!isConnected || !address) {
    return null;
  }

  const isBSC = chainId === 56 || chainId === 97;

  return (
    <div className="bg-robovm-border rounded-lg p-6 border border-robovm-accent/30 mb-6">
      <h3 className="text-xl font-semibold text-robovm-accent mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
        Wallet Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <span className="text-robovm-text-secondary text-sm block mb-1">Wallet Address:</span>
            <span className="text-robovm-text font-mono text-sm break-all">{address}</span>
          </div>
          <div>
            <span className="text-robovm-text-secondary text-sm block mb-1">Network:</span>
            <span className={`font-semibold ${isBSC ? 'text-green-400' : 'text-red-400'}`}>
              {chainId === 56 ? 'BSC Mainnet' : chainId === 97 ? 'BSC Testnet' : `Chain ID: ${chainId}`}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {bnbBalance && (
            <div>
              <span className="text-robovm-text-secondary text-sm block mb-1">BNB Balance:</span>
              <span className="text-robovm-accent font-semibold text-lg">
                {parseFloat(bnbBalance.formatted).toFixed(4)} {bnbBalance.symbol}
              </span>
            </div>
          )}
          {rvmBalance ? (
            <div>
              <span className="text-robovm-text-secondary text-sm block mb-1">RVM Balance:</span>
              <span className="text-robovm-accent font-semibold text-lg">
                {parseFloat(rvmBalance.formatted).toFixed(2)} RVM
              </span>
            </div>
          ) : rvmTokenAddress && (
            <div>
              <span className="text-robovm-text-secondary text-sm block mb-1">RVM Token:</span>
              <span className="text-robovm-text font-mono text-xs break-all">
                {rvmTokenAddress.slice(0, 10)}...{rvmTokenAddress.slice(-8)}
              </span>
              <span className="text-robovm-text-secondary text-xs block mt-1">
                (Token address configured but balance unavailable)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
