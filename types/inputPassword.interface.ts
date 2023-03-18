import { Dispatch, SetStateAction } from 'react';

export interface IInputPassword {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}
