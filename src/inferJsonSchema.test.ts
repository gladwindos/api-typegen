import { describe, it, expect } from "vitest";
import type { JSONSchema } from "json-schema-to-typescript";
import { inferJsonSchema } from "./inferJsonSchema";

describe("inferJsonSchema", () => {
  it("should infer schema for primitive types", () => {
    expect(inferJsonSchema("string")).toEqual({ type: "string" });
    expect(inferJsonSchema(123)).toEqual({ type: "number" });
    expect(inferJsonSchema(true)).toEqual({ type: "boolean" });
    expect(inferJsonSchema(null)).toEqual({ type: "null" });
  });

  it("should infer schema for simple objects", () => {
    const data = { name: "John", age: 30 };
    const expectedSchema: JSONSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
      },
      additionalProperties: false,
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });

  it("should infer schema for arrays", () => {
    const data = [1, 2, 3];
    const expectedSchema: JSONSchema = {
      type: "array",
      items: { type: "number" },
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });

  it("should infer schema for nested objects", () => {
    const data = {
      person: {
        name: "John",
        address: {
          city: "London",
          country: "UK",
        },
      },
    };

    const expectedSchema: JSONSchema = {
      type: "object",
      properties: {
        person: {
          type: "object",
          properties: {
            name: { type: "string" },
            address: {
              type: "object",
              properties: {
                city: { type: "string" },
                country: { type: "string" },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });

  it("should infer schema for arrays of objects", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    const expectedSchema: JSONSchema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
        additionalProperties: false,
      },
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });

  it("should handle empty objects with additionalProperties true", () => {
    const data = {};
    const expectedSchema: JSONSchema = {
      type: "object",
      properties: {},
      additionalProperties: true,
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });

  it("should handle non-empty objects with additionalProperties false", () => {
    const data = { key: "value" };
    const expectedSchema: JSONSchema = {
      type: "object",
      properties: {
        key: { type: "string" },
      },
      additionalProperties: false,
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });

  it("should handle empty arrays", () => {
    const data = [];
    const expectedSchema: JSONSchema = {
      type: "array",
      items: {},
    };
    expect(inferJsonSchema(data)).toEqual(expectedSchema);
  });
});
