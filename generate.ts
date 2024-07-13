import { compile } from "json-schema-to-typescript";
import * as fs from "fs";

type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
type JsonObject = { [key: string]: JsonValue };
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

type EndpointBody = JsonObject | JsonArray | string;

interface Endpoint {
  typeName: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: EndpointBody;
}

async function fetchData(endpoint: Endpoint): Promise<any> {
  try {
    const { url, method, headers = {}, queryParams = {}, body } = endpoint;

    const urlObj = new URL(url);
    Object.entries(queryParams).forEach(([key, value]) => {
      urlObj.searchParams.append(key, value);
    });

    const response = await fetch(urlObj.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

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

  for (const endpoint of endpoints) {
    const data = await fetchData(endpoint);
    const schema = generateJsonSchema(data);
    const types = await generateTypes(schema, endpoint.typeName);
    allTypes += types + "\n";
  }

  saveTypesToFile(allTypes, filePath);
}

async function main() {
  const endpoints: Endpoint[] = [
    {
      typeName: "BearerData",
      url: "https://httpbin.org/bearer",
      method: "GET",
      headers: {
        Authorization: `Bearer YOUR_BEARER_TOKEN_HERE`,
      },
    },
    {
      typeName: "Todo",
      url: "https://jsonplaceholder.typicode.com/todos/1",
      method: "GET",
    },
    {
      typeName: "Post",
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: "foo",
        content: "bar",
        userId: 1,
      },
    },
    {
      typeName: "User",
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
      queryParams: {
        id: "1",
      },
    },
  ];

  const filePath = "./responseTypes.ts";
  await generateTypesFromApis(endpoints, filePath);
}

main();
