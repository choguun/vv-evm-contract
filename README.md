### How to deploy vv-evm-contract
* npx hardhat run scripts/01_deploy_protocol.ts --network sepolia
* config contract address to all deploy scripts.
* npx hardhat run scripts/02_setup_world.ts --network sepolia
* npx hardhat run scripts/03_add_quest.ts --network sepolia
* npx hardhat run scripts/04_add_recipe.ts --network sepolia
* npx hardhat run scripts/05_add_gameitem.ts --network sepolia

### Key Features:
1. On-chain Game Logic eg. Quest(Daily Check-in, Raffle, Mini game), Craft, Item, Token, Profile, and World.
2. Multiplayer
3. Supported Multi-Platform on browser
4. On-chain AI NPC utilize ORA Onchain AI Oracle
5. Support Cross-Chain feature(NFT, Token) powered by Zeta Chain

### How it works:
![How it works](/howitwork.png "How it works")

### Deployed ETH Sepolia
1.Profile - NFT Profile to identify unique user https://sepolia.etherscan.io/address/0x3ae322b2ab6aff88bcd1da3a7662d111e31e82c5 \
2.Token - ERC20 In-game token https://sepolia.etherscan.io/address/0xe11c9fe8a69830d983e35a604d26da97f1e6977e \
3.Item - ERC1155 game item https://sepolia.etherscan.io/address/0xf425beefe0fb21728203758de6fedfac73d0d79e \
4.World - On-chain game logic https://sepolia.etherscan.io/address/0x7ebba474c0d83bb3fb5955b221640abaf825e125 \
5.NPC - On-Chain AI NPC https://sepolia.etherscan.io/address/0x408a15d92d15ec99f486bd7d990f1c7491a1cd90

### Deployed BSC Testnet

### Deployed Manta Testnet
1.Profile - NFT Profile to identify unique user https://pacific-explorer.sepolia-testnet.manta.network/address \
2.Token - ERC20 In-game token https://pacific-explorer.sepolia-testnet.manta.network/address \
3.Item - ERC1155 game item https://pacific-explorer.sepolia-testnet.manta.network/address \
4.World - On-chain game logic https://pacific-explorer.sepolia-testnet.manta.network/address