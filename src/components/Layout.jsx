import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected()
  });
  const { disconnect } = useDisconnect();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>RoboVM</h1>
          </Link>
          <nav className="nav">
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Dashboard
            </Link>
            <Link to="/robots" className={isActive('/robots') ? 'active' : ''}>
              Robots
            </Link>
            <Link to="/tasks" className={isActive('/tasks') ? 'active' : ''}>
              Tasks
            </Link>
            <Link to="/transactions" className={isActive('/transactions') ? 'active' : ''}>
              Transactions
            </Link>
          </nav>
          <div className="wallet">
            {isConnected ? (
              <div className="wallet-info">
                <span className="address">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button onClick={disconnect} className="disconnect-btn">
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={connect} className="connect-btn">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2025 RoboVM. Decentralized network of autonomous robots.</p>
        <div className="footer-links">
          <a href="https://robovm.space" target="_blank" rel="noopener noreferrer">Website</a>
          <a href="https://docs.robovm.space" target="_blank" rel="noopener noreferrer">Documentation</a>
          <a href="https://x.com/robo_vm" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

