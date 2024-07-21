export interface BearerData {
  authenticated?: boolean;
  token?: string;
}

export interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed?: boolean | null;
}

export interface Post {
  title?: string;
  content?: string;
  userId?: number;
  id?: number;
}

export interface UsersItem {
  id: number;
  name: string | null;
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat: string | null;
      lng: string | null;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}
export type Users = UsersItem[];

export interface Anything {
  args?: {};
  data?: string;
  files?: {};
  form?: {};
  headers?: {
    Accept?: string;
    "Accept-Encoding"?: string;
    "Accept-Language"?: string;
    "Content-Length"?: string;
    "Content-Type"?: string;
    Host?: string;
    "Sec-Fetch-Mode"?: string;
    "User-Agent"?: string | null;
    "X-Amzn-Trace-Id"?: string;
  };
  json?: {
    users?: {
      friends?: {
        id?: number;
        name?: string;
      }[];
      id?: number;
      name?: string;
    }[];
  };
  method?: string;
  origin?: string;
  url?: string;
}

