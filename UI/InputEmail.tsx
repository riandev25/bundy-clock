import { IInputEmail } from '@/types/inputEmail.interface';
import { Label, TextInput } from 'flowbite-react';

export const InputEmail = ({ email, setEmail }: IInputEmail) => {
  return (
    <section>
      <div className="mb-2 block">
        <Label htmlFor="email1" value="Your email" />
      </div>
      <TextInput
        id="email1"
        type="email"
        placeholder="sample_email@gmail.com"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </section>
  );
};
