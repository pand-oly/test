import { Decimal } from "@prisma/client/runtime"

export const ACCOUNT_1_MOCK = {
  id: 1,
  balance: new Decimal(100)
}

export const ACCOUNT_2_MOCK = {
  id: 2,
  balance: new Decimal(100)
}

export const ACCOUNT_2_LITTLE_BALANCE_MOCK = {
  id: 2,
  balance: new Decimal(1)
}
