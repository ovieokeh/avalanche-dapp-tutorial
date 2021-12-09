/* eslint-disable no-undef */
async function deploy() {
  // Hardhat gets signers from the accounts configured in the config
  const [deployer] = await hre.ethers.getSigners()

  console.log('Deploying contract with the account:', deployer.address)

  // Create an instance of the contract by providing the name
  const ContractSource = await hre.ethers.getContractFactory('Avaxbox')
  // The deployed instance of the contract
  const deployedContract = await ContractSource.deploy()

  console.log('Contract deployed at:', deployedContract.address)
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
