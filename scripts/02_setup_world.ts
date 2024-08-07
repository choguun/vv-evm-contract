const { ethers } = require('hardhat');

async function main() {
  const Contract = await ethers.getContractFactory("World");
  const deployedContract = await Contract.attach('0x13211c88c8270b4f3e57d1cc12b3a92bc4d80a4b');

  const account = "0xbf729ed79ef9c4922990503c8dc349c82167492a";
  const registry = "0x72252edff7a6a809f56b10568c426f00ec859a93";
  const item = "0xfefe410b86c2fcdd395607f9283140b8e7af3ab0";
  const token = "0x403ad143c44a9b8dbbb6254ed0988b9334615eee";
  const profile = "0x68631b5c5e3344e29f33a60f621d2e647e3320e3";
  const craft = "0x2bcfad10e867fefad315cee33d259711734adac1";
  const vault = "0x2fbc4b3afea5906123c8b335e11aa9bafb2785aa";
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


  const tx7 = await deployedContract.setVault(vault);
  const receipt7 = await tx7.wait();

  console.log('Transaction receipt7: ', receipt7);

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