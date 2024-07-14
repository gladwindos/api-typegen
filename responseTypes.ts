export interface BearerData {
  authenticated?: boolean | null;
  token?: string | null;
}

export interface Todo {
  userId?: number | null;
  id?: number | null;
  title?: string | null;
  completed?: boolean | null;
}

export interface Post {
  title?: string | null;
  content?: string | null;
  userId?: number | null;
  id?: number | null;
}

export interface UsersItem {
  id?: number | null;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  address?: {
    street?: string | null;
    suite?: string | null;
    city?: string | null;
    zipcode?: string | null;
    geo?: {
      lat?: string | null;
      lng?: string | null;
    };
  };
  phone?: string | null;
  website?: string | null;
  company?: {
    name?: string | null;
    catchPhrase?: string | null;
    bs?: string | null;
  };
}
export type Users = UsersItem[];

export interface Anything {
  args?: {};
  data?: string | null;
  files?: {};
  form?: {};
  headers?: {
    Accept?: string | null;
    "Accept-Encoding"?: string | null;
    "Accept-Language"?: string | null;
    "Content-Length"?: string | null;
    "Content-Type"?: string | null;
    Host?: string | null;
    "Sec-Fetch-Mode"?: string | null;
    "User-Agent"?: string | null;
    "X-Amzn-Trace-Id"?: string | null;
  };
  json?: {
    users?: {
      friends?: {
        id?: number | null;
        name?: string | null;
      }[];
      id?: number | null;
      name?: string | null;
    }[];
  };
  method?: string | null;
  origin?: string | null;
  url?: string | null;
}

