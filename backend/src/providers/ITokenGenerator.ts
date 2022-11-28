import { IUserPayload } from '../entities/IUser';

export default interface ITokenGenerator {
  generator(payload: IUserPayload): string;
}
