import { Decimal } from '@prisma/client/runtime';

export default interface ITransaction {
  debitedAccountId: number;
  creditedAccountId: number;
  value: Decimal;
  createdAt?: Date;
}

export interface ITransfer {
  id: number;
  value: Decimal;
}
