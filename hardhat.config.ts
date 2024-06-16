import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";
require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 3500000,
    },
    baseTestnet: {
      url: `	https://sepolia.base.org`,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  },
  etherscan: {
    apiKey: "E9AGX4KQBTW1FFHBTBSA2NJZCEIDBIBXUT",
    // customChains: [
    //   {
    //     network: "opbnb",
    //     chainId: 5611, // Replace with the correct chainId for the "opbnb" network
    //     urls: {
    //       apiURL:
    //         "https://open-platform.nodereal.io/64a9df0874fb4a93b9d0a3849de012d3/op-bnb-testnet/contract/",
    //       browserURL: "https://testnet.opbnbscan.com/",
    //     },
    //   },
    // ],
  },
  sourcify: {
    enabled: false
  }
};

export default config;
