import IRegister from '../entities/IRegister';
import IUser from '../entities/IUser';

export default interface IRegisterUserRepository {
  create(obj: IRegister): Promise<IUser>
}
