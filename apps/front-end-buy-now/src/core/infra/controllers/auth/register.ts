
import { RegisterUserDto } from '@/core/domain/types/register-user.types';
import { api } from '../../services/api.services';

export async function registerService(data: RegisterUserDto): Promise<void> {
  await api.post('/auth/register', data);
}
