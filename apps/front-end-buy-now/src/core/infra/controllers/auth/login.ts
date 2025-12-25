
import type { LoginDto, LoginResponse } from '@/core/domain/types/login.types';
import { api } from '../../services/api.services';

export async function loginService(data: LoginDto): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res
}

