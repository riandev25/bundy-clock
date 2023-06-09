import Head from 'next/head';
import { Inter } from 'next/font/google';
import RegisterForm from '@/components/Auth/RegisterForm';

const inter = Inter({ subsets: ['latin'] });

export default function Register() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen w-full from-gray-500 to-gray-300 bg-gradient-to-r">
        <RegisterForm />
      </main>
    </>
  );
}
