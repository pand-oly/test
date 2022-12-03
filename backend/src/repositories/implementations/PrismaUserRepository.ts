import { PrismaClient } from '@prisma/client';
import IAccess from '../../entities/IAccess';
import IUser from '../../entities/IUser';
import { ErrorTypes } from '../../errors/catalogErrors';
import IRegisterUserRepository from '../IRegisterUserRepository';

const prisma = new PrismaClient();

export default class PrismaUserRepository implements IRegisterUserRepository {
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
}
