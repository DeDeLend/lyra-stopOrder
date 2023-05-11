import {HardhatRuntimeEnvironment} from "hardhat/types"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const {deployments, getNamedAccounts, network} = hre
  const {deploy, save, getArtifact} = deployments
  const {deployer} = await getNamedAccounts()

  save("LwETH", {
    address: "0xe485155ce647157624C5E2A41db45A9CC88098c3",
    abi: await getArtifact("contracts/StopOrder.sol:IOptionToken").then((x) => x.abi),
  })

  save("LwBTC", {
    address: "0x0e97498F3d91756Ec7F2d244aC97F6Ea9f4eBbC3",
    abi: await getArtifact("contracts/StopOrder.sol:IOptionToken").then((x) => x.abi),
  })
}

deployment.tags = ["test", "tokens", "arbitrum"]
export default deployment
