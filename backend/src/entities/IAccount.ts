import { Decimal } from '@prisma/client/runtime';

export default interface IAccount {
  id: number,
  balance: Decimal,
}
