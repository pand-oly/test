import IAccess from '../entities/IAccess';
import IUser from '../entities/IUser';

export default interface IRegisterUserRepository {
  create(obj: IAccess): Promise<IUser>
}
