export interface BearerData {
  authenticated: boolean;
  token: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  title: string;
  content: string;
  userId: number;
  id: number;
}

export interface User {
  "0": {
    [k: string]: unknown;
  };
}

