import { createContext, useContext, useState } from 'react';

type User = { id: string; name: string; email: string; role: 'admin'|'customer' } | null;

const AuthContext = createContext({
  user: null as User,
  login: (_u: User) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>(() => {
    try{
      const s = localStorage.getItem('echi_user');
      return s ? JSON.parse(s) as User : null;
    }catch(e){ return null }
  });

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem('echi_user', JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('echi_user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
