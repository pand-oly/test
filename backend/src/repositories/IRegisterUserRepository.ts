import IAccess from '../entities/IAccess';
import { IUserPayload } from '../entities/IUser';

export default interface IRegisterUserRepository {
  create(obj: IAccess): Promise<IUserPayload>
}
