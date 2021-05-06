import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import api from '../services/api';
import Loader from '../components/elements/Loader';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextPayload {
  user: User;
  authenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextPayload>({} as AuthContextPayload);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('@exodus:token');
    const user = Cookies.get('@exodus:user');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
      setUser(JSON.parse(user));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const signIn = async ({ email, password }) => {
    const response = await api.post('/authenticate', {
      email,
      password,
    });
    const { user, token } = response.data;

    Cookies.set('@exodus:user', JSON.stringify(user));
    Cookies.set('@exodus:token', JSON.stringify(token));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setUser(user);
    setAuthenticated(true);

    router.push('/');
  };

  const signOut = () => {
    Cookies.remove('@exodus:token');
    Cookies.remove('@exodus:user');
    router.push('/login');
    setUser(null);
    setAuthenticated(false);
  };

  var publicRouters = ['/login'];

  if ((typeof window !== 'undefined' && loading) || loading) {
    return <Loader />;
  }

  if (!authenticated && !publicRouters.includes(router.route)) {
    router.push(`/login`);
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
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
