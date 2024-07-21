import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";
require('dotenv').config()

import { getHardhatConfigNetworks } from "@zetachain/networks";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.7" },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 999,
      },
    },
  },
  networks: {
    ...getHardhatConfigNetworks(),
    sepolia: {
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 3500000,
    }
  },
  etherscan: {
  },
  sourcify: {
    enabled: false
  }
};

export default config;
