import IAccount from '../../entities/IAccount';
import { ErrorTypes } from '../../errors/catalogErrors';
import PrismaAccountModel from '../../prismaDatabase/models/PrismaAccountModel';
import IAccountRepository from '../IAccountRepository';

export default class AccountRepository implements IAccountRepository {
  constructor(private _accountModel: PrismaAccountModel) { }

  public async findOne(id: number): Promise<IAccount> {
    try {
      const account = await this._accountModel.findOne(id);
      return account;
    } catch (error) {
      throw new Error(ErrorTypes.NotUserFoundError);
    }
  }

  public async transaction(dataCashOut: IAccount, dataCashIn: IAccount): Promise<IAccount> {
    const accountDebitUpdated = await this._accountModel.updated(dataCashOut);
    await this._accountModel.updated(dataCashIn);

    return accountDebitUpdated;
  }
}
