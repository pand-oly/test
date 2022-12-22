import IAccess from '../entities/IAccess';
import { IUserPayload } from '../entities/IUser';

export default interface ILoginRepository {
  findOne(obj: IAccess): Promise<IUserPayload | null>
}
