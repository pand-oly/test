import { PrismaClient } from '@prisma/client';
import IAccess from '../../entities/IAccess';
import IUser from '../../entities/IUser';
import { ErrorTypes } from '../../errors/catalogErrors';
import ILoginRepository from '../ILoginRepository';
import IRegisterUserRepository from '../IRegisterUserRepository';

const prisma = new PrismaClient();

export default class PrismaUserRepository implements IRegisterUserRepository, ILoginRepository {
  private _prisma: PrismaClient;
  constructor() {
    this._prisma = prisma;
  }

  public async create(obj: IAccess): Promise<IUser> {
    try {
      const user = await this._prisma.users.create({
        data: {
          username: obj.username,
          password: obj.password,
          account: {
            create: {
              balance: 100,
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(ErrorTypes.ErrorInDatabase);
    }
  }

  public async findOne(obj: IAccess): Promise<IUser | null> {
    const { username, password } = obj;
    try {
      const user = await this._prisma.users.findFirst({
        where: { username, password },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(ErrorTypes.NotUserFoundError);
    }
  }
}
