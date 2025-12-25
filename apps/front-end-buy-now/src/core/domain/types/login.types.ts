export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginDto {
  email: string;
  password: string;
}