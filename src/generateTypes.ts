import { Endpoint } from "./config/types";
import { convertSchemaToType } from "./utils/convertSchemaToType";
import { fetchData } from "./utils/fetchData";
import { inferJsonSchema } from "./utils/inferJsonSchema";
import { mergeWithJsonSchema } from "./utils/mergeJsonSchema";

export const generateTypes = async (endpoints: Endpoint[]): Promise<string> => {
  let allTypes = "";

  for (const endpoint of endpoints) {
    const data = await fetchData(endpoint);

    let schema = inferJsonSchema(data);

    if (endpoint.override) {
      schema = mergeWithJsonSchema(schema, endpoint.override);
    }

    const type = await convertSchemaToType(schema, endpoint.typeName);

    allTypes += type + "\n";
  }

  return allTypes;
};
