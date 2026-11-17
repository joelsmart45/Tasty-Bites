import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  loadSession,
  saveSession,
  clearSession,
  authenticate,
  type Session,
  type AuthUser,
  type UserRole,
} from '../auth/auth';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = loadSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (email: string, password: string): { ok: boolean; error?: string } => {
      const result = authenticate(email, password);
      if (!result) {
        return { ok: false, error: 'Invalid email or password.' };
      }
      setUser(result.user);
      setToken(result.token);
      saveSession({ user: result.user, token: result.token });
      return { ok: true };
    },
    [],
  );

  const register = useCallback(
    (name: string, email: string, password: string): { ok: boolean; error?: string } => {
      if (!name.trim() || !email.trim() || !password) {
        return { ok: false, error: 'Please fill in all fields.' };
      }
      if (password.length < 6) {
        return { ok: false, error: 'Password must be at least 6 characters.' };
      }
      const result = authenticate(email, password);
      if (result) {
        return { ok: false, error: 'An account with this email already exists.' };
      }
      const newUser: AuthUser = {
        id: `cust-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: 'customer',
      };
      const newToken = `ml_${newUser.id}_${Date.now()}`;
      setUser(newUser);
      setToken(newToken);
      saveSession({ user: newUser, token: newToken });
      return { ok: true };
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearSession();
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
