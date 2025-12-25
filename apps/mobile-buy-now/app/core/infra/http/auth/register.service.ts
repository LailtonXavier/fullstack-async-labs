import { RegisterDto } from '@/app/core/domain/types/register.types';
import { LoginResponse } from '../../../domain/types/login.types';
import { api } from '../../services/api.services';

export async function registerService(
  data: RegisterDto,
){
  await api.post<LoginResponse>('/auth/register', data);
}