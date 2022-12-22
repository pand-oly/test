import { PrismaClient } from '@prisma/client';
import ITransaction from '../../entities/ITransaction';
import prismaConnection from './prismaConnection';

export default class PrismaTransactionModel {
  private _prisma: PrismaClient;
  constructor() { this._prisma = prismaConnection; }

  public async create(data: ITransaction) {
    const { debitedAccountId, creditedAccountId, value } = data;
    const result = this._prisma.transactions.create({
      data: {
        debitedAccountId,
        creditedAccountId,
        value,
      },
    });

    return result;
  }
}
