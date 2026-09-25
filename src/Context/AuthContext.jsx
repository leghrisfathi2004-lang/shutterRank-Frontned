import { createContext, useContext, useEffect, useState } from 'react';
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

  const logout = () => {
    clearToken();
    setUser(null);
  };

  // (re)load the logged-in user from /players/me
  // → call it after login, register, join/quit/create team
  const refreshUser = async () => {
    try {
      const player = await getMe();
      setUser(player);
    } catch {
      setUser(null);
    }
  };

  const value = { user, loading, logout, refreshUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
