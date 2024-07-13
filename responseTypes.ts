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

