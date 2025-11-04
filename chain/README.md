# RoboVM Blockchain Layer

Smart contracts for task allocation, reputation management, and token economy.

## Overview

The blockchain layer consists of three main smart contracts:

1. **RoboToken.sol** - BEP-20 token (RoboVM/RVM) for payments and rewards
2. **RoboTask.sol** - Task allocation and management system
3. **Reputation.sol** - Reputation system with staking mechanism

## Contracts

### RoboToken (RVM)

Native BEP-20 token for the RoboVM ecosystem.

* **Total Supply**: 1,000,000,000 RVM
* **Decimals**: 18
* **Standard**: BEP-20 with OpenZeppelin implementation
* **Network**: Binance Smart Chain (BSC)

### RoboTask

Manages task lifecycle from creation to completion and reward distribution.

Key functions:
* `createTask()` - Create a new task with reward
* `acceptTask()` - Robot accepts a task
* `submitResult()` - Submit task result with IPFS CID
* `finalize()` - Finalize task and distribute rewards
* `placeBid()` - Bid on tasks (auction mechanism)

### Reputation

Tracks robot reputation and manages staking.

Features:
* Reputation scoring based on task completion
* Staking mechanism for high-value tasks
* Slashing for fraudulent behavior
* Reputation-based task filtering

## Setup

> ⚠️ **Work in Progress**: Installation and deployment instructions are currently being developed.

### Prerequisites

* Node.js 18+
* npm or yarn
* Hardhat or Foundry

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file with:

```
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
NETWORK=bsc
```

### Compile

```bash
npx hardhat compile
```

### Test

```bash
npx hardhat test
```

### Deploy

```bash
npx hardhat run scripts/deploy.js --network bsc
```

## Network

Currently configured for:
* Binance Smart Chain (BSC)
* Binance Smart Chain Testnet (BSC Testnet)

## Testing

Run the test suite:

```bash
npm test
```

Test coverage includes:
* Token minting and transfers
* Task creation and acceptance
* Result submission and finalization
* Reputation updates
* Staking and slashing
* Edge cases and security tests

## Security

* OpenZeppelin contracts for security
* ReentrancyGuard protection
* Pull-over-push payment pattern
* Comprehensive test coverage

## Contract Addresses

> Contract addresses will be available after deployment.

## ABI

ABI files are generated in `artifacts/` after compilation.

## Links

* [RoboVM Website](https://robovm.space)
* [Documentation](https://docs.robovm.space)
* [X (Twitter)](https://x.com/robo_vm)

