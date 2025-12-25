export interface DeleteUserResponse {
  success: boolean,
  message: string
}

export interface DeleteUserDto {
  password: string;
}