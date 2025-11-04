# RoboVM

Decentralized network of autonomous robots controlled by blockchain smart contracts.

## Overview

RoboVM combines three key technology layers:

1. **Robotics Layer** - ROS2-based robot control and simulation
2. **Virtual Machine Layer** - Isolated execution environments for each robot
3. **Blockchain Layer** - Smart contracts for task allocation, reputation, and token economy

```
┌──────────────────────────────┐
│       Blockchain Layer        │
│ Binance Smart Chain (BSC)     │
│ Smart Contracts:              │
│  - Task Allocation            │
│  - Reputation & Tokens        │
│  - Data Exchange Ledger       │
└──────────────────────────────┘
            ▲        ▲
            │        │
┌───────────┴────────┴───────────┐
│       Edge / Cloud Layer        │
│   - VM per Robot Instance       │
│   - AI Decision Module (ROS2)   │
│   - Blockchain Node Client      │
│   - Simulation Environment      │
└────────────────────────────────┘
            ▲
            │
┌───────────┴──────────┐
│   Physical Robots /   │
│   Simulated Robots    │
│   (Drones, Rovers)    │
│ Sensors / Actuators   │
└───────────────────────┘
```

## Key Features

* 🤖 **Autonomous Decision Making** - Each robot operates independently
* ⛓️ **Blockchain Integration** - Transparent and immutable task coordination
* 🪙 **RoboVM Token (RVM)** - Native BEP-20 token for rewards and payments
* 🖥️ **VM Simulation** - Safe testing environment before physical deployment
* 🔒 **Decentralized Architecture** - No single point of failure

## Repository Structure

```
RoboVM/
 ├─ chain/           # Smart contracts, Hardhat, tests
 ├─ robot/           # ROS2 packages: robot_agent, task_listener
 ├─ ops/             # Docker, Kubernetes, deployment scripts
 ├─ web/             # Dashboard (React + ethers.js)
 └─ dashboard/       # Analytics dashboard
```

## Getting Started

> ⚠️ **Work in Progress**: Installation and setup instructions are currently being developed. This project is under active development.

### Prerequisites

* Node.js 18+
* npm or yarn
* MetaMask browser extension (for wallet connection)

### Installation

```bash
npm install
```

### Configuration

Create a `.env.local` file:

```
REACT_APP_RPC_URL=https://bsc-dataseed.binance.org/
REACT_APP_CONTRACT_ADDRESS=0x...
REACT_APP_NETWORK=bsc
REACT_APP_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

### Development

```bash
npm start
```

The app will open at `http://localhost:3000`

### Building

```bash
npm run build
```

## Components

### Blockchain Layer (`chain/`)

Smart contracts deployed on Binance Smart Chain (BSC):

* **RoboToken (RVM)** - BEP-20 token for payments and rewards
* **RoboTask** - Task allocation and management
* **Reputation** - Reputation system and staking

### Robotics Layer (`robot/`)

ROS2-based robot control:

* **robot_agent** - Main robot control node
* **task_listener** - Blockchain event listener and task executor
* **Navigation** - Autonomous navigation module

### Web Dashboard (`web/`)

React-based web3 dashboard:

* Real-time robot status monitoring
* Task visualization and management
* Blockchain transaction history
* Wallet integration (MetaMask)

### Analytics Dashboard (`dashboard/`)

Two dashboard options:

**1. Standalone Dashboard** (Recommended - deploy directly to Vercel)
* Next.js + Recharts dashboard
* 25+ visualizations
* Zero backend required
* Deploy directly from GitHub to Vercel
* Dark theme (#0b1e3e background, #d2618f accent)

**2. Superset Dashboard** (Advanced - requires backend)
* Apache Superset with 25+ visualizations
* Requires Superset backend (Railway/Render)
* Full-featured analytics platform
* Dark theme with custom styling

## Tokenomics

**RoboVM Token (RVM)** - BEP-20 Token on BSC

* **Network**: Binance Smart Chain (BSC)
* **Token Name**: RoboVM
* **Ticker**: RVM
* **Standard**: BEP-20
* **Total Supply**: 1,000,000,000 RVM
* **Decimals**: 18
* **Use Cases**:
  - Payment for completed tasks
  - Rewards for mission execution
  - Staking for reputation
  - Governance voting

> **Note**: Detailed tokenomics are still being determined. Distribution and vesting schedules will be announced in future updates.

## Web3 Integration

* **ethers.js** - Blockchain interaction
* **wagmi** - React hooks for Web3
* **viem** - TypeScript interface for Ethereum

## API Integration

The dashboard connects to:
* Blockchain RPC (Binance Smart Chain - BSC)
* IPFS Gateway (for task results)
* ROS2 bridge (for real-time data)

## Deployment

### Build

```bash
npm run build
```

### Deploy

Deploy the `dist/` directory to your hosting service:
* Vercel
* Netlify
* GitHub Pages
* AWS S3 + CloudFront

## Roadmap

- [x] Phase 0: Repository structure and setup
- [x] Phase 1: Basic simulation + VM
- [x] Phase 2: Smart contracts + Token RVM
- [ ] Phase 3: Robot ↔ Blockchain integration
- [ ] Phase 4: Multi-robot + bidding system
- [ ] Phase 5: Security, reputation, and staking
- [ ] Phase 6: Hardening & optimization

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

* [RoboVM Website](https://robovm.space)
* [Documentation](https://docs.robovm.space)
* [X (Twitter)](https://x.com/robo_vm)
