import * as SecureStore from 'expo-secure-store';

export interface AuthData {
  accessToken: string;
  refreshToken?: string;
  userId: string;
}

const KEY = 'auth';

export const tokenStore = {
  async save(data: AuthData) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(data));
  },

  async get(): Promise<AuthData | null> {
    const raw = await SecureStore.getItemAsync(KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async getAccessToken(): Promise<string | null> {
    const data = await this.get();
    return data?.accessToken ?? null;
  },

  async clear() {
    await SecureStore.deleteItemAsync(KEY);
  },
};
