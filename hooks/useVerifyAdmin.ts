import { useAuth } from '@/context/AuthContext';
import router from 'next/router';
import { useEffect } from 'react';

export const useVerifyAdmin = () => {
  const { user, loading } = useAuth(); // get loading state from context value

  const isAdmin = user.uid === process.env.NEXT_PUBLIC_ADMIN_UID ? true : false;

  useEffect(() => {
    if (!loading && user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      // only redirect if loading is false and user.uid is null
      router.push('/auth/login');
      return;
    }
  }, [user, loading]);

  return { isAdmin };
};
