import { type JSONSchema } from "json-schema-to-typescript";

export const inferJsonSchema = (data: unknown): JSONSchema => {
  if (Array.isArray(data)) {
    return {
      type: "array",
      items: data.length > 0 ? inferJsonSchema(data[0]) : {},
    };
  } else if (typeof data === "object" && data !== null) {
    const additionalProperties = Object.keys(data).length === 0;

    const schema: JSONSchema = {
      type: "object",
      properties: {},
      additionalProperties,
    };

    for (const [key, value] of Object.entries(data)) {
      (schema.properties as Record<string, JSONSchema>)[key] =
        inferJsonSchema(value);
    }

    return schema;
  } else if (data === null) {
    return {
      type: "null",
    };
  } else {
    return {
      type: typeof data as JSONSchema["type"],
    };
  }
};
