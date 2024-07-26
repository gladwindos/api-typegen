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

