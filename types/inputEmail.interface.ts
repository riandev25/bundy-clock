import { Dispatch, SetStateAction } from 'react';

export interface IInputEmail {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}
