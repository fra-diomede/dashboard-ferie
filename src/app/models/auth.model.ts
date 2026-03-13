export interface AuthResponse {
  tokenType: string;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  username: string;
  ruoli: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  ruoli?: string[];
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface AuthSession {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string | null;
  username: string;
  ruoli: string[];
}
