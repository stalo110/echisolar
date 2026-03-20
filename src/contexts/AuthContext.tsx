import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest, register as registerRequest } from '../services/authService';
import type { LoginPayload, RegisterPayload } from '../services/authService';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  country?: string | null;
} | null;

type AuthState = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
  demoLogin: (role: 'admin' | 'user') => User;
  updateUser: (updates: Partial<NonNullable<User>>) => void;
};

const STORAGE_KEY = 'echi_auth';

const loadAuthState = (): AuthState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuthState) : null;
  } catch {
    return null;
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => null,
  register: async () => null,
  logout: () => {},
  demoLogin: () => null,
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<AuthState | null>(loadAuthState);
  const navigate = useNavigate();

  const persistState = (next: AuthState | null) => {
    setState(next);
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (payload: LoginPayload) => {
    const data = await loginRequest(payload);
    const next: AuthState = { token: data.token, user: data.user };
    persistState(next);
    return next.user;
  };

  const register = async (payload: RegisterPayload) => {
    const data = await registerRequest(payload);
    const next: AuthState = { token: data.token, user: data.user };
    persistState(next);
    return next.user;
  };

  const logout = () => {
    persistState(null);
    navigate('/');
  };

  const demoLogin = (role: 'admin' | 'user') => {
    const user = {
      id: role === 'admin' ? 0 : 1,
      name: role === 'admin' ? 'Demo Admin' : 'Demo Customer',
      email: role === 'admin' ? 'admin@echisolar.com' : 'user@echisolar.com',
      role,
    } satisfies User;

    const next: AuthState = { token: `demo-${role}-${Date.now()}`, user };
    persistState(next);
    return user;
  };

  const updateUser = (updates: Partial<NonNullable<User>>) => {
    if (!state?.user || !state.token) return;
    const nextUser = { ...state.user, ...updates };
    persistState({ token: state.token, user: nextUser });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state?.user ?? null,
        token: state?.token ?? null,
        isAuthenticated: Boolean(state?.token),
        login,
        register,
        logout,
        demoLogin,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
