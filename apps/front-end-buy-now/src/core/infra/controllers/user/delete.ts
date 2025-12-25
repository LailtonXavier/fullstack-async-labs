
import { DeleteUserDto, DeleteUserResponse } from '@/core/domain/types/delete-user';
import { api } from '../../services/api.services';

export async function deteleUserService(userId: string, data: DeleteUserDto): Promise<DeleteUserResponse> {
  return await api.post<DeleteUserResponse>(`/users/${userId}`, data);
}
