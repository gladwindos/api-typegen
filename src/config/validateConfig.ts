import Ajv from "ajv";
import { type JSONSchema } from "json-schema-to-typescript";

export const validateConfig = (config: unknown, schema: JSONSchema): void => {
  const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
  const validate = ajv.compile(schema);
  const valid = validate(config);

  if (!valid) {
    console.error("Invalid configuration:");
    validate.errors?.forEach((error) => {
      console.error(error);
    });
    process.exit(1);
  }
};
