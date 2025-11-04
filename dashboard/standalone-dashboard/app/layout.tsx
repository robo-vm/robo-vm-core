import type { Metadata } from 'next';
import './globals.css';
import WalletProvider from './providers/WalletProvider';

export const metadata: Metadata = {
  title: 'RoboVM Analytics Dashboard',
  description: 'Standalone analytics dashboard for RoboVM network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-robovm-bg text-robovm-text">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

