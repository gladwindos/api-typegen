import { type JSONSchema } from "json-schema-to-typescript";

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type EndpointBody = JsonObject | JsonArray | string;

export interface Endpoint {
  typeName: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: EndpointBody;
  override?: JSONSchema;
}

// This type is used to generate the schema.json using https://github.com/vega/ts-json-schema-generator
export interface Config {
  endpoints: Endpoint[];
}
