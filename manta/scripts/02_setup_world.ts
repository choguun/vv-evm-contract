const { ethers } = require('hardhat');

async function main() {
  const Contract = await ethers.getContractFactory("World");
  const deployedContract = await Contract.attach('0x7ebba474c0d83bb3fb5955b221640abaf825e125');

  const account = "0xbf729ed79ef9c4922990503c8dc349c82167492a";
  const registry = "0x72252edff7a6a809f56b10568c426f00ec859a93";
  const item = "0xf425beefe0fb21728203758de6fedfac73d0d79e";
  const token = "0xe11c9fe8a69830d983e35a604d26da97f1e6977e";
  const profile = "0x3ae322b2ab6aff88bcd1da3a7662d111e31e82c5";
  const craft = "0x15f765ae2123c3c6191c1a7a4d07ee48bccdd026";
  const chainId = 11155111;

  const tx = await deployedContract.setProfile(profile);
  const receipt = await tx.wait();

  console.log('Transaction receipt: ', receipt);

  const tx2 = await deployedContract.setToken(token);
  const receipt2 = await tx2.wait();

  console.log('Transaction receipt2: ', receipt2);

  const tx3 = await deployedContract.setItem(item);
  const receipt3 = await tx3.wait();

  console.log('Transaction receipt3: ', receipt3);

  const tx4 = await deployedContract.configTokenBound(registry, account, chainId);
  const receipt4 = await tx4.wait();

  console.log('Transaction receipt4: ', receipt4);

  const tx5 = await deployedContract.setCraft(craft);
  const receipt5 = await tx5.wait();

  console.log('Transaction receipt5: ', receipt5);

  const CraftContract = await ethers.getContractFactory("CraftSystem");
  const deployedCraftContract = await CraftContract.attach(craft);

  const tx6 = await deployedCraftContract.setItem(item);
  const receipt6 = await tx6.wait();

  console.log('Transaction receipt5: ', receipt6);

  console.log('======================== DONE ========================');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });