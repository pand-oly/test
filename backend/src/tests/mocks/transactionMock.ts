import { Decimal } from "@prisma/client/runtime";

export const TRANSACTION_SEND_BODY = {
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: 10,
};

const mock_date = '2022-12-23T22:23:20.235Z' as unknown as Date; 

export const RETURNS_TRANSACTION_SUCCESS = {
  id: 1,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: new Decimal(10),
  createdAt: mock_date,
};
