import { LoginDto, LoginResponse } from '@/app/core/domain/types/login.types';
import { useAuthStore } from '@/app/core/store/authStore';
import { tokenStore } from '@/app/core/store/tokenStore';
import { api } from '../../services/api.services';

export async function loginService(
  data: LoginDto,
): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', data);

    await tokenStore.save({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      userId: response.userId,
    });

    useAuthStore.getState().signIn({
      accessToken: response.accessToken,
      userId: response.userId,
    });

    return response;
  } catch (error) {
    await tokenStore.clear();
    throw error;
  }
}
