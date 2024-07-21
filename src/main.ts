import { generateTypes } from ".";
import { Endpoint } from "./types";
import { saveTypesToFile } from "./utils/saveTypesToFile";

const main = async () => {
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
      override: {
        properties: {
          completed: { type: ["boolean", "null"] },
        },
        required: ["id", "title"],
      },
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
      typeName: "Users",
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
      queryParams: {
        id: "1",
      },
      override: {
        items: {
          properties: {
            name: { type: ["string", "null"] },
            address: {
              properties: {
                geo: {
                  properties: {
                    lat: { type: ["string", "null"] },
                    lng: { type: ["string", "null"] },
                  },
                  required: ["lat", "lng"],
                },
              },
            },
          },
          required: ["id", "name"],
        },
      },
    },
    {
      typeName: "Anything",
      url: "https://httpbin.org/anything",
      method: "POST",
      body: {
        users: [
          {
            id: 1,
            name: "gladz",
            friends: [
              {
                id: 2,
                name: "John",
              },
              {
                id: 3,
                name: "Jess",
              },
            ],
          },
        ],
      },
      override: {
        properties: {
          headers: {
            properties: {
              "User-Agent": { type: ["string", "null"] },
            },
          },
        },
      },
    },
  ];

  const types = await generateTypes(endpoints);

  saveTypesToFile(types, "./exampleTypes.ts");
};

main();
