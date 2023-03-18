import { IInputPassword } from '@/types/inputPassword.interface';
import { Label, TextInput } from 'flowbite-react';

export const InputPassword = ({ password, setPassword }: IInputPassword) => {
  return (
    <section>
      <div className="mb-2 block">
        <Label htmlFor="password1" value="Your password" />
      </div>
      <TextInput
        id="password1"
        type="password"
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </section>
  );
};
