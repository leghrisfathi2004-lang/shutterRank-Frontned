import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth.js';
import { getMe } from '../api/players.js';
import { getToken, clearToken } from '../lib/token.js';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const { player } = await apiLogin(credentials);
    setUser(player);
    return player;
  };

  const register = async (fields) => {
    const { player } = await apiRegister(fields);
    setUser(player);
    return player;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const player = await getMe();
      setUser(player);
    } catch {
      setUser(null);
    }
  };

  const value = { user, loading, login, register, logout, refreshUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
