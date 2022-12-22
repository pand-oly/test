import { IUserPayload } from '../entities/IUser';

export default interface ITokenVerify {
  verifyToken(token: string | undefined): IUserPayload;
}
