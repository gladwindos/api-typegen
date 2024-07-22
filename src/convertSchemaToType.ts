import { type JSONSchema, compile } from "json-schema-to-typescript";

export const convertSchemaToType = async (
  schema: JSONSchema,
  typeName: string
): Promise<string> => {
  try {
    if (schema.type === "array" && schema.items) {
      const itemTypeName = `${typeName}Item`;
      const itemSchema = schema.items;

      const itemType = await compile(itemSchema, itemTypeName, {
        bannerComment: "",
      });

      const arrayType = `export type ${typeName} = ${itemTypeName}[];\n`;

      return itemType + arrayType;
    } else {
      const type = await compile(schema, typeName, {
        bannerComment: "",
      });
      return type;
    }
  } catch (error) {
    console.error(`Error converting schema to type for ${typeName}:`, error);
    process.exit(1);
  }
};
