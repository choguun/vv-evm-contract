### How to deploy vv-evm-contract
* npx hardhat run scripts/01_deploy_protocol.ts --network testnet
* config contract address to all deploy scripts.
* npx hardhat run scripts/02_setup_world.ts --network testnet
* npx hardhat run scripts/03_add_quest.ts --network testnet
* npx hardhat run scripts/04_add_recipe.ts --network testnet
* npx hardhat run scripts/05_add_gameitem.ts --network testnet

### Key Features:
1. On-chain Game Logic eg. Quest(Daily Check-in, Raffle, Mini game), Craft, Item, Token, Profile, and World.
2. Multiplayer
3. Supported Multi-Platform on browser
4. On-chain AI NPC utilize ORA Onchain AI Oracle

### How it works:
![How it works](/howitwork.png "How it works")

### Screenshot
![GUI](/gui.png "GUI")