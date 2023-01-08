import ITransactionRepository from '../repositories/ITransactionRepository';
import ITokenVerify from '../providers/ITokenVerify';
import ITransaction from '../entities/ITransaction';

export default class GetTransactionsService {
  constructor(
    private _transactionRepository : ITransactionRepository,
    private _verifyToken: ITokenVerify,
  ) {}

  async execute(id: string, token: string | undefined): Promise<ITransaction[]> {
    this._verifyToken.verifyToken(token);

    const transactions = await this._transactionRepository.findAll(Number(id));

    return transactions;
  }
}
