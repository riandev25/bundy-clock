import { useAuth } from '@/context/AuthContext';
import router from 'next/router';
import { useEffect } from 'react';

export const useVerifyUser = () => {
  const { user, loading } = useAuth(); // get loading state from context value

  useEffect(() => {
    if (!loading && !user.uid) {
      // only redirect if loading is false and user.uid is null
      router.push('/auth/login');
      return;
    }
  }, [user, loading]);
};
