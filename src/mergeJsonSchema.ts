import { type JSONSchema } from "json-schema-to-typescript";

export const mergeProperties = (
  generatedProperties: Record<string, JSONSchema>,
  overrideProperties: Record<string, JSONSchema>
): Record<string, JSONSchema> => {
  const mergedProperties: Record<string, JSONSchema> = {
    ...generatedProperties,
  };

  for (const key in overrideProperties) {
    if (mergedProperties[key]) {
      mergedProperties[key] = mergeWithJsonSchema(
        mergedProperties[key],
        overrideProperties[key]
      );
    } else {
      mergedProperties[key] = overrideProperties[key];
    }
  }

  return mergedProperties;
};

export const mergeWithJsonSchema = (
  generatedSchema: JSONSchema,
  override: JSONSchema
): JSONSchema => {
  const mergedSchema: JSONSchema = { ...generatedSchema };

  for (const key in override) {
    if (
      key === "properties" &&
      override.properties &&
      mergedSchema.properties
    ) {
      mergedSchema.properties = mergeProperties(
        mergedSchema.properties,
        override.properties
      );
    } else if (key === "items" && override.items && mergedSchema.items) {
      mergedSchema.items = mergeWithJsonSchema(
        mergedSchema.items,
        override.items
      );
    } else if (key === "required") {
      if (
        Array.isArray(override.required) &&
        Array.isArray(mergedSchema.required)
      ) {
        mergedSchema.required = Array.from(
          new Set([...mergedSchema.required, ...override.required])
        );
      } else {
        mergedSchema.required = override.required;
      }
    } else {
      (mergedSchema as any)[key] = override[key];
    }
  }

  return mergedSchema;
};
