import { compile } from "json-schema-to-typescript";
import * as fs from "fs";

interface Endpoint {
  typeName: string;
  url: string;
  method: string;
  headers?: Record<string, string>;
}

async function fetchData(
  url: string,
  method: string,
  headers: Record<string, string> = {}
): Promise<any> {
  try {
    const response = await fetch(url, { method, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
}

function generateJsonSchema(data: any): any {
  const schema: any = {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  };

  for (const key of Object.keys(data)) {
    schema.properties[key] = { type: typeof data[key] };

    if (data[key] !== null && data[key] !== undefined) {
      schema.required.push(key);
    }
  }

  return schema;
}

async function generateTypes(schema: any, typeName: string): Promise<string> {
  try {
    const ts = await compile(schema, typeName, {
      bannerComment: "",
    });
    return ts;
  } catch (error) {
    console.error("Error generating TypeScript types:", error);
    process.exit(1);
  }
}

function saveTypesToFile(types: string, filePath: string): void {
  fs.writeFileSync(filePath, types);
  console.log("Types saved to:", filePath);
}

async function generateTypesFromApis(endpoints: Endpoint[], filePath: string) {
  let allTypes = "";

  for (const { url, method, headers = {}, typeName } of endpoints) {
    const data = await fetchData(url, method, headers);
    const schema = generateJsonSchema(data);
    const types = await generateTypes(schema, typeName);
    allTypes += types + "\n";
  }

  saveTypesToFile(allTypes, filePath);
}

async function main() {
  const endpoints: Endpoint[] = [
    {
      url: "https://httpbin.org/bearer",
      method: "GET",
      headers: {
        Authorization: `Bearer test-bearer-token`,
      },
      typeName: "BearerData",
    },
    {
      url: "https://jsonplaceholder.typicode.com/todos/1",
      method: "GET",
      typeName: "Todo",
    },
  ];

  const filePath = "./responseTypes.ts";
  await generateTypesFromApis(endpoints, filePath);
}

main();
