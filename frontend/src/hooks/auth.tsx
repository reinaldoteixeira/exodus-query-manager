import { createContext, useCallback, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextPayload {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextPayload>({} as AuthContextPayload);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/users/authenticate', {
      email,
      password,
    });
    const { user, token } = response.data;

    Cookies.set('@exodus:user', JSON.stringify(user));
    Cookies.set('@exodus:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setUser(user);
    setToken(token);
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('@exodus:user');
    Cookies.remove('@exodus:token');

    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextPayload {
  const context = useContext(AuthContext);
  return context;
}

export default AuthProvider;
