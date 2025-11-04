require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const RPC_URL_BSC = process.env.RPC_URL_BSC || "https://bsc-dataseed.binance.org/";
const RPC_URL_BSC_TESTNET = process.env.RPC_URL_BSC_TESTNET || "https://data-seed-prebsc-1-s1.binance.org:8545/";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    bsc: {
      url: RPC_URL_BSC,
      accounts: [PRIVATE_KEY],
      chainId: 56,
    },
    bscTestnet: {
      url: RPC_URL_BSC_TESTNET,
      accounts: [PRIVATE_KEY],
      chainId: 97,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  etherscan: {
    apiKey: {
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

