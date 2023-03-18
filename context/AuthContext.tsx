import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { IUserType } from '@/types/userType.interface';
import { IAuth } from '@/types/Auth.interface';

// Auth Context
const AuthContext = createContext<IAuth>({
  user: { email: null, uid: null },
  signUp: (email: string, password: string) => {
    throw new Error('Registration error');
  },
  logIn: (email: string, password: string) => {
    throw new Error('Login error');
  },
  logOut: () => {
    throw new Error('Logout error');
  },
  loading: true,
});

// Auth Context Hook
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUserType>({ email: null, uid: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
      setLoading(false); // Set loading state to false after authentication status is determined
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, loading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
