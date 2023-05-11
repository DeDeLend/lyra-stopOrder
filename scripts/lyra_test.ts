import { getMarketDeploys, getGlobalDeploys } from '@lyrafinance/protocol';
import { StopOrder } from "../typechain-types";

const hre = require("hardhat");

async function main() {
  const [ deployer ] = await hre.ethers.getSigners()

  let stopOrderETH = (await hre.ethers.getContract("stopOrderETH")) as StopOrder
  const tx = await stopOrderETH.checkStopOrder(0)
  await stopOrderETH.executeStopOrder(0)
  console.log(tx.toString())


  console.log("OK")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
