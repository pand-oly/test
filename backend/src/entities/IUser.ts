import { JwtPayload } from 'jsonwebtoken';

export default interface IUser {
  id: number;
  username: string;
  password: string;
  accountId: number;
}

export interface IUserPayload extends Omit<IUser, 'password' | 'id'>, JwtPayload {}
