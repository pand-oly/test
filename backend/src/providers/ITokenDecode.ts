import { IUserPayload } from '../entities/IUser';

export default interface ITokenDecode {
  verifyToken(token: string | undefined): IUserPayload;
}
