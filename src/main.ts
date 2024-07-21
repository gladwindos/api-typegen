import { generateTypes } from ".";
import { getConfig } from "./config/getConfig";
import { saveTypesToFile } from "./utils/saveTypesToFile";

const main = async () => {
  const config = getConfig("./config.json");

  const types = await generateTypes(config.endpoints);

  saveTypesToFile(types, "./exampleTypes.ts");
};

main();
