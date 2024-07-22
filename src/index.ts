#! /usr/bin/env node
import { Command } from "commander";
import { getConfig } from "./config/getConfig";
import { generateTypes } from "./generateTypes";
import { saveTypesToFile } from "./saveTypesToFile";

export { generateTypes };
export { type Endpoint } from "./config/types";

const main = async (
  configPath: string = "./config.json",
  outputPath: string = "./apiTypegen.ts"
) => {
  const config = getConfig(configPath);

  const types = await generateTypes(config.endpoints);

  saveTypesToFile(types, outputPath);
};

const setupCli = async () => {
  const program = new Command();

  const packageJson = await import("../package.json", {
    assert: { type: "json" },
  });

  program
    .version(packageJson.default.version)
    .description("Generate TypeScript types from API endpoints")
    .requiredOption("-c, --config <path>", "Path to the configuration file")
    .option("-o, --output <path>", "Path to the output file")
    .parse(process.argv);

  const options = program.opts();

  main(options.config, options.output);
};

if (require.main === module) {
  setupCli();
}
