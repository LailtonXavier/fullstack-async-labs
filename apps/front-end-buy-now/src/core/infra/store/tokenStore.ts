interface AuthData {
  accessToken: string;
  userId: string;
  refreshToken?: string;
}

export const tokenStore = {
  saveAuthData(data: AuthData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(data));
      window.dispatchEvent(new Event('auth:change'));
    }
  },

  getAuthData(): AuthData | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('auth');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    const auth = this.getAuthData();
    return auth ? auth.accessToken : null;
  },

  clear() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
      window.dispatchEvent(new Event('auth:change'));
    }
  },
};