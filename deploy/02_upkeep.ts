import {HardhatRuntimeEnvironment} from "hardhat/types"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const {deployments, getNamedAccounts, network} = hre
  const {deploy, get, execute} = deployments
  const {deployer} = await getNamedAccounts()

  const stopOrderETH = await get("stopOrderETH")
  const stopOrderBTC = await get("stopOrderBTC")

  await deploy("upkeepStopOrderETH", {
    contract: "UpkeepStopOrder",
    from: deployer,
    log: true,
    args: [stopOrderETH.address],
  })

  await deploy("upkeepStopOrderBTC", {
    contract: "UpkeepStopOrder",
    from: deployer,
    log: true,
    args: [stopOrderBTC.address],
  })

}

deployment.tags = ["upkeep"]
deployment.dependencies = ["tokens", "stop_order"]

export default deployment
