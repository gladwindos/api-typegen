import Ajv from "ajv";
import { type JSONSchema } from "json-schema-to-typescript";

export const validateConfig = (config: any, schema: JSONSchema): void => {
  const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
  const validate = ajv.compile(schema);
  const valid = validate(config);

  if (!valid) {
    console.error("Invalid configuration:");
    validate.errors?.forEach((error) => {
      console.error(`  ${error.instancePath} ${error.message}`);
    });
    process.exit(1);
  }
};
