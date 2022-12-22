import { PrismaClient } from '@prisma/client';
import IAccess from '../../entities/IAccess';
import { IUserPayload } from '../../entities/IUser';
import { ErrorTypes } from '../../errors/catalogErrors';
import prismaConnection from './prismaConnection';

export default class PrismaUserModel {
  private _prisma: PrismaClient;
  constructor() {
    this._prisma = prismaConnection;
  }

  public async create(obj: IAccess): Promise<IUserPayload> {
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
        select: { username: true, accountId: true },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(ErrorTypes.Conflict);
    }
  }

  public async findOne(obj: IAccess): Promise<IUserPayload | null> {
    const { username, password } = obj;
    try {
      const user = await this._prisma.users.findFirst({
        where: { username, password },
        select: {
          username: true,
          accountId: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(ErrorTypes.NotUserFoundError);
    }
  }
}
