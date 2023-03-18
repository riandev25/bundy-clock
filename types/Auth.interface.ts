import { UserCredential } from 'firebase/auth';
import { IUserType } from './userType.interface';

export interface IAuth {
  user: IUserType;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
}
