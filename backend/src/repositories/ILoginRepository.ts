import IAccess from '../entities/IAccess';
import IUser from '../entities/IUser';

export default interface ILoginRepository {
  findOne(obj: IAccess): Promise<IUser | null>
}
