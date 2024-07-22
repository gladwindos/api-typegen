import { describe, it, expect } from "vitest";
import { mergeWithJsonSchema, mergeProperties } from "./mergeJsonSchema";
import type { JSONSchema } from "json-schema-to-typescript";

describe("mergeProperties", () => {
  it("should merge non-conflicting properties", () => {
    const generated: JSONSchema = { name: { type: "string" } };
    const override: JSONSchema = { age: { type: "number" } };
    const expected = { name: { type: "string" }, age: { type: "number" } };
    expect(mergeProperties(generated, override)).toEqual(expected);
  });

  it("should override existing properties", () => {
    const generated: JSONSchema = { name: { type: "string" } };
    const override: JSONSchema = { name: { type: "number" } };
    const expected = { name: { type: "number" } };
    expect(mergeProperties(generated, override)).toEqual(expected);
  });

  it("should deep merge nested properties", () => {
    const generated: JSONSchema = {
      user: { type: "object", properties: { name: { type: "string" } } },
    };
    const override: JSONSchema = {
      user: { properties: { age: { type: "number" } } },
    };
    const expected = {
      user: {
        type: "object",
        properties: { name: { type: "string" }, age: { type: "number" } },
      },
    };
    expect(mergeProperties(generated, override)).toEqual(expected);
  });

  it("should handle empty override", () => {
    const generated: JSONSchema = { name: { type: "string" } };
    const override: JSONSchema = {};
    expect(mergeProperties(generated, override)).toEqual(generated);
  });

  it("should handle empty generated", () => {
    const generated: JSONSchema = {};
    const override: JSONSchema = { name: { type: "string" } };
    expect(mergeProperties(generated, override)).toEqual(override);
  });

  it("should merge complex nested structures", () => {
    const generated: JSONSchema = {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
          address: { type: "object", properties: { city: { type: "string" } } },
        },
      },
    };
    const override: JSONSchema = {
      user: {
        properties: {
          age: { type: "number" },
          address: { properties: { country: { type: "string" } } },
        },
      },
    };
    const expected = {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
          address: {
            type: "object",
            properties: {
              city: { type: "string" },
              country: { type: "string" },
            },
          },
        },
      },
    };
    expect(mergeProperties(generated, override)).toEqual(expected);
  });
});

describe("mergeWithJsonSchema", () => {
  it("should merge basic properties", () => {
    const generated: JSONSchema = {
      type: "object",
      properties: { name: { type: "string" } },
    };
    const override: JSONSchema = { properties: { age: { type: "number" } } };
    const expected: JSONSchema = {
      type: "object",
      properties: { name: { type: "string" }, age: { type: "number" } },
    };
    expect(mergeWithJsonSchema(generated, override)).toEqual(expected);
  });

  it("should override existing properties", () => {
    const generated: JSONSchema = {
      type: "object",
      properties: { name: { type: "string" } },
    };
    const override: JSONSchema = { properties: { name: { type: "number" } } };
    const expected: JSONSchema = {
      type: "object",
      properties: { name: { type: "number" } },
    };
    expect(mergeWithJsonSchema(generated, override)).toEqual(expected);
  });

  it("should merge array items", () => {
    const generated: JSONSchema = { type: "array", items: { type: "string" } };
    const override: JSONSchema = { items: { minLength: 5 } };
    const expected: JSONSchema = {
      type: "array",
      items: { type: "string", minLength: 5 },
    };
    expect(mergeWithJsonSchema(generated, override)).toEqual(expected);
  });

  it("should merge required fields", () => {
    const generated: JSONSchema = { type: "object", required: ["name"] };
    const override: JSONSchema = { required: ["age"] };
    const expected: JSONSchema = { type: "object", required: ["name", "age"] };
    expect(mergeWithJsonSchema(generated, override)).toEqual(expected);
  });

  it("should handle deep merging", () => {
    const generated: JSONSchema = {
      type: "object",
      properties: {
        user: { type: "object", properties: { name: { type: "string" } } },
      },
    };
    const override: JSONSchema = {
      properties: {
        user: { properties: { age: { type: "number" } } },
      },
    };
    const expected: JSONSchema = {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: { name: { type: "string" }, age: { type: "number" } },
        },
      },
    };
    expect(mergeWithJsonSchema(generated, override)).toEqual(expected);
  });
});
