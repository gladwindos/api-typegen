import { generateTypes } from ".";
import { Endpoint } from "./types";

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
    },
  ];

  await generateTypes(endpoints, "./exampleTypes.ts");
};

main();
