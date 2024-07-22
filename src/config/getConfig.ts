import fs from "fs";
import type { JSONSchema } from "json-schema-to-typescript";
import type { Config } from "./types";
import { validateConfig } from "./validateConfig";
import configSchema from "./schema.json";

export const getConfig = (filePath: string): Config => {
  try {
    const configData = fs.readFileSync(filePath, "utf8");

    const config = JSON.parse(configData);

    const schema: JSONSchema = JSON.parse(JSON.stringify(configSchema));

    validateConfig(config, schema);
    return config;
  } catch (error) {
    console.error("Error getting config:", error);
    process.exit(1);
  }
};
