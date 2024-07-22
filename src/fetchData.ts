import { Endpoint } from "./config/types";

export const fetchData = async (endpoint: Endpoint): Promise<unknown> => {
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
      const message = `Failed to fetch data from ${url}. Status: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
};
