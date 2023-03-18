import Head from 'next/head';
import { Inter } from 'next/font/google';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import router from 'next/router';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
  const { user } = useAuth();

  // Redirect if the user already has an account
  useEffect(() => {
    if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push('/admin');
    } else if (user.uid !== process.env.ADMIN_UID && user.uid) {
      router.push('/employee');
    } else {
      return;
    }
  }, [user, user.uid]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen w-full from-gray-500 to-gray-300 bg-gradient-to-r">
        {!user.uid ? <LoginForm /> : null}
        <ToastContainer autoClose={3000} />
      </main>
    </>
  );
}
