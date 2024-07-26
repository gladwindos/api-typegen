# API Typegen

A TypeScript type generator that creates type definitions from API endpoints.

## Example

Input (`config.json`):

```json
{
  "endpoints": [
    {
      "typeName": "Todo",
      "url": "https://jsonplaceholder.typicode.com/todos/1",
      "method": "GET"
    },
    {
      "typeName": "Posts",
      "url": "https://jsonplaceholder.typicode.com/posts",
      "method": "GET"
    },
    {
      "typeName": "User",
      "url": "https://jsonplaceholder.typicode.com/users",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    }
  ]
}
```

Output (`types.ts`):

```typescript
export interface Todo {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}

export interface PostsItem {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
export type Posts = PostsItem[];

export interface User {
  name?: string;
  email?: string;
  id?: number;
}
```

## Installation

```bash
npm install api-typegen
```

## Usage

### CLI

You can use API Typegen directly from the command line:

```bash
npx api-typegen --config path/to/config.json --output types.ts
```

### Programmatic Usage

You can also use API Typegen programmatically:

```typescript
import fs from "fs";
import { generateTypes, type Endpoint } from "api-typegen";

const endpoints: Endpoint[] = [
  {
    typeName: "Todo",
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
  },
  {
    typeName: "Post",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
  },
];

const types = await generateTypes(endpoints);
fs.writeFileSync("types.ts", types);
```

## Configuration

Each endpoint in the configuration can have the following properties:

- `typeName` (required): The name of the generated TypeScript type.

- `url` (required): The URL of the API endpoint.

- `method` (required): The HTTP method (GET, POST, PUT, DELETE, PATCH).

- `headers` (optional): An object of custom headers to send with the request.

- `queryParams` (optional): An object of query parameters to append to the URL.

- `body` (optional): The request body for POST, PUT, or PATCH requests.

- `override` (optional): A JSON Schema object to override the inferred schema.

### Schema Override

You can override a type by providing a JSON Schema object in the `override` property. This allows you to customize the generated types to better suit your needs. For example, the following configuration makes all the properties no longer optional and the `completed` property nullable:

```json
{
  "endpoints": [
    {
      "typeName": "Todo",
      "url": "https://jsonplaceholder.typicode.com/todos/1",
      "method": "GET",
      "override": {
        "properties": {
          "completed": { "type": ["boolean", "null"] }
        },
        "required": ["userId", "id", "title", "completed"]
      }
    }
  ]
}
```

Output:

```typescript
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean | null;
}
```
