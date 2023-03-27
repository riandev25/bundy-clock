import { Button } from 'flowbite-react';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { InputEmail } from '@/UI/InputEmail';
import { InputPassword } from '@/UI/inputPassword';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credential, setCredential] = useState<UserCredential | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const { signUp, user, logOut } = useAuth();

  const router = useRouter();

  // Register user
  const onSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredentials = await signUp(email, password);
      toast.success('Successful Registration', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setEmail('');
      setPassword('');
      toast.success('Registration Successful', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error('Registration Failed', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const logOutUser = () => {
    logOut();
    setIsLogout(true);
  };

  // Redirect if the user already has an account
  useEffect(() => {
    if (user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID && !user) {
      router.push('/auth/login');
    } else {
      setIsAdmin(true);
    }
  }, [router, user, user.uid]);

  // useEffect(() => {
  //   if (isLogout) router.push('/auth/login');
  // }, [isLogout, router]);

  return isAdmin ? (
    <Fragment>
      <form
        className="flex flex-col gap-4 p-6 backdrop-blur-sm bg-white/50 rounded-md"
        onSubmit={onSignUp}
      >
        <h3 className="text-lg">Employee Account Registration</h3>
        <InputEmail email={email} setEmail={setEmail} />
        <InputPassword password={password} setPassword={setPassword} />
        <Button type="submit">Submit</Button>
        <Button type="button" color="dark" onClick={logOutUser}>
          Logout
        </Button>
      </form>
      <ToastContainer autoClose={2000} />
    </Fragment>
  ) : null;
};

export default RegisterForm;
