import { Decimal } from '@prisma/client/runtime';
import ITransaction from '../entities/ITransaction';
import { ErrorTypes } from '../errors/catalogErrors';
import IAccountRepository from '../repositories/IAccountRepository';
import ITransactionRepository from '../repositories/ITransactionRepository';

export default class TransactionService {
  constructor(
    private _accountRepositorie: IAccountRepository,
    private _transactionRepository: ITransactionRepository,
  ) { }

  async execute(data: ITransaction): Promise<ITransaction> {
    const { debitedAccountId, value, creditedAccountId } = data;

    const accountCashOut = await this._accountRepositorie.findOne(debitedAccountId);
    if (value > accountCashOut.balance) {
      throw new Error(ErrorTypes.InsufficientCredit);
    }

    const accountCashIn = await this._accountRepositorie.findOne(creditedAccountId);

    const cashIn = new Decimal(Number(accountCashIn.balance) + Number(value));
    const cashOut = new Decimal(Number(accountCashOut.balance) - Number(value));

    await this._accountRepositorie
      .transaction(
        { id: debitedAccountId, balance: cashOut },
        { id: creditedAccountId, balance: cashIn },
      );

    const transaction = await this._transactionRepository.create(data);

    return transaction;
  }
}
