import type { User } from './user';

export interface MainContextInterface {
  token: string;
  setToken: (token: string) => void;
  user: User;
  setUser: (user: User) => void;
}
