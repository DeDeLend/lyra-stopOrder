import {HardhatRuntimeEnvironment} from "hardhat/types"
import { ethers } from "hardhat"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const {deployments, getNamedAccounts, network} = hre
  const { deploy, getArtifact, save, execute } = deployments
  const {deployer} = await getNamedAccounts()

  await deploy("stopOrderETH", {
    contract: "StopOrder",
    from: deployer,
    log: true,
    args: [
      "0x639fe6ab55c921f74e7fac1ee960c0b6293ba612", // _priceProvider
      "0x919E5e0C096002cb8a21397D724C4e3EbE77bC15", // _optionMarket
      "0xe485155ce647157624C5E2A41db45A9CC88098c3" // _optionToken
    ],
  })

  await deploy("stopOrderBTC", {
    contract: "StopOrder",
    from: deployer,
    log: true,
    args: [
      "0x6ce185860a4963106506c203335a2910413708e9", // _priceProvider
      "0xe044919cf58dFb066FC9DE7c69C7db19f336B20c", // _optionMarket
      "0x0e97498F3d91756Ec7F2d244aC97F6Ea9f4eBbC3" // _optionToken
    ],
  })

  await execute(
    "stopOrderETH",
    {log: true, from: deployer},
    "setRewardAddress",
    "0x683Ad8b899Cd14d8e077c9A623E8B3fEd65a8c09"
  )

  await execute(
    "stopOrderBTC",
    {log: true, from: deployer},
    "setRewardAddress",
    "0x683Ad8b899Cd14d8e077c9A623E8B3fEd65a8c09"
  )
}

deployment.tags = ["stop_order"]
deployment.dependencies = ["tokens"]

export default deployment
