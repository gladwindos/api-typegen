import { getConfig } from "./config/getConfig";
import { generateTypes } from "./generateTypes";
import { saveTypesToFile } from "./utils/saveTypesToFile";

const main = async () => {
  const config = getConfig("./config.json");

  const types = await generateTypes(config.endpoints);

  saveTypesToFile(types, "./exampleTypes.ts");
};

main();
