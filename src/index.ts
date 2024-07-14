import { Endpoint } from "./types";
import { fetchData } from "./utils/fetchData";
import { inferJsonSchema } from "./utils/inferJsonSchema";
import { convertSchemaToType } from "./utils/convertSchemaToType";
import { saveTypesToFile } from "./utils/saveTypesToFile";

export const generateTypes = async (
  endpoints: Endpoint[],
  filePath: string
) => {
  let allTypes = "";

  for (const endpoint of endpoints) {
    const data = await fetchData(endpoint);
    const schema = inferJsonSchema(data);
    const type = await convertSchemaToType(schema, endpoint.typeName);
    allTypes += type + "\n";
  }

  saveTypesToFile(allTypes, filePath);
};
