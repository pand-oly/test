import { PrismaClient } from '@prisma/client';
import IAccount from '../../entities/IAccount';
import prismaConnection from './prismaConnection';

export default class PrismaAccountModel {
  private _prisma: PrismaClient;
  constructor() {
    this._prisma = prismaConnection;
  }

  public async findOne(id: number): Promise<IAccount> {
    const account = this._prisma.accounts.findFirstOrThrow({
      where: { id },
    });

    return account;
  }

  public async updated(data: IAccount): Promise<IAccount> {
    const accountUpdated = await this._prisma.accounts.update({
      where: { id: data.id },
      data: { balance: data.balance },
    });

    return accountUpdated;
  }
}
