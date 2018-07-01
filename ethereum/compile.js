const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Delete entire 'build' folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Read 'Campaign.sol' from the contracts folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

// Compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

// Write output to the 'build' directory
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
