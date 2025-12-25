
import { User } from '@/app/core/domain/entities/user';
import { api } from '../../services/api.services';

export async function getUserService(): Promise<User> {
  return await api.get('/users');
}
