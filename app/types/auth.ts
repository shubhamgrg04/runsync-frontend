export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expires_at: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
} 
