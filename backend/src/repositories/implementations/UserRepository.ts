import IAccess from '../../entities/IAccess';
import { IUserPayload } from '../../entities/IUser';
import PrismaUserModel from '../../prismaDatabase/models/PrismaUserModel';
import ILoginRepository from '../ILoginRepository';
import IRegisterUserRepository from '../IRegisterUserRepository';

export default class UserRepository implements IRegisterUserRepository, ILoginRepository {
  constructor(private _userModel: PrismaUserModel) { }

  public async create(obj: IAccess): Promise<IUserPayload> {
    const newUser = await this._userModel.create(obj);
    return newUser;
  }

  public async findOne(obj: IAccess): Promise<IUserPayload | null> {
    const user = await this._userModel.findOne(obj);
    return user;
  }
}
