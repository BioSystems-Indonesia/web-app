export interface Claims {
  userId: string;
  username: string;
  role?: string;
}

export interface Token {
  id: string;
  token: string;
}
