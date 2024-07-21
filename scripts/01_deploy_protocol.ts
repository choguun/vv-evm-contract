import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const owner = "0x1a46582A48a04c67D78e062E0631cDDE9fD2DF0a";
  const connectorAddress = "0x3963341dad121c9CD33046089395D66eBF20Fb03";
  const zetaTokenAddress = "0x0000c304D2934c00Db1d51995b9f6996AffD17c0";
  const zetaConsumerAddress = "0x301ED39771d8f1dD0b05F8C2D4327ce9C426E783";
  const useEven = true;

  const profile = await hre.viem.deployContract("Profile", [owner, connectorAddress, zetaTokenAddress, zetaConsumerAddress, useEven]);
  const world = await hre.viem.deployContract("World", [owner]);
  const token = await hre.viem.deployContract("Token", [owner, world.address, profile.address, connectorAddress, zetaTokenAddress, zetaConsumerAddress]);
  const craft = await hre.viem.deployContract("CraftSystem", [owner, world.address]);
  const item = await hre.viem.deployContract("Item", [owner, world.address, craft.address, ""]);
  // const erc6551Account  = await hre.viem.deployContract("ERC6551Account");
  // const erc6551Registry = await hre.viem.deployContract("ERC6551Registry");
  const NPC = await hre.viem.deployContract("NPC", ["0x0A0f4321214BB6C7811dD8a71cF587bdaF03f0A0"]);
  const ERC4626Vault = await hre.viem.deployContract("ERC4626Vault", [token.address]);

  await token.write.setWorld([world.address as `0x${string}`]);
  
  // console.log(
  //   `account address: ${erc6551Account.address}`
  // );
  // console.log(
  //   `registry address: ${erc6551Registry.address}`
  // );

  console.log(
    `item address: ${item.address}`
  );
  console.log(
    `token address: ${token.address}`
  );
  console.log(
    `profile address: ${profile.address}`
  );
  console.log(
    `craft address: ${craft.address}`
  );
  console.log(
    `world address: ${world.address}`
  )
  console.log(
    `NPC address: ${NPC.address}`
  )
  console.log(
    `ERC4626Vault address: ${ERC4626Vault.address}`
  )

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
