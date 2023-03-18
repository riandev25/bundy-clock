import { Button } from 'flowbite-react';
import { FormEvent, useEffect, useState } from 'react';
import { InputEmail } from '@/UI/InputEmail';
import { InputPassword } from '@/UI/inputPassword';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { UserCredential } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn } = useAuth();

  // Login the employee
  const onSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await logIn(email, password);
    } catch (err) {
      toast.error('Login failed', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-6 backdrop-blur-sm bg-white/50 rounded-md"
      onSubmit={onSignIn}
    >
      <h3 className="text-lg font-medium">Company Employee Sign In</h3>
      <div className="space-y-2">
        <h4 className="font-medium">Sample Accounts</h4>
        <div>
          <h5 className="text-sm">email: company_admin@gmail.com</h5>
          <h5 className="text-sm">password: company_admin</h5>
        </div>
        <div>
          <h5 className="text-sm">email: company_employee@gmail.com</h5>
          <h5 className="text-sm">password: company_employee</h5>
        </div>
      </div>
      <InputEmail email={email} setEmail={setEmail} />
      <InputPassword password={password} setPassword={setPassword} />
      <Button type="submit">Submit</Button>
      <ToastContainer autoClose={1000} />
    </form>
  );
};

export default LoginForm;
