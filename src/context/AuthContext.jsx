import { useMemo, useState } from 'react';
import { authService } from '@services/authService.js';
import { storage } from '@utils/storage.js';
import { AuthContext } from './authContextValue.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get('auth_user'));
  const [token, setToken] = useState(() => storage.get('auth_token'));
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);

    try {
      const session = await authService.login(credentials);
      setUser(session.user);
      setToken(session.token);
      storage.set('auth_user', session.user);
      storage.set('auth_token', session.token);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove('auth_user');
    storage.remove('auth_token');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
