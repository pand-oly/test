import { Decimal } from '@prisma/client/runtime';
import ITokenVerify from '../providers/ITokenVerify';
import IAccountRepository from '../repositories/IAccountRepository';

export default class BalanceService {
  constructor(
    private _accountRepository: IAccountRepository,
    private _verifyToken: ITokenVerify,
  ) {}

  async execute(id: string, token: string | undefined): Promise<Decimal> {
    this._verifyToken.verifyToken(token);
    const account = await this._accountRepository.findOne(Number(id));
    return account.balance;
  }
}
