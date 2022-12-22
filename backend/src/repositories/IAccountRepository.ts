import IAccount from '../entities/IAccount';

export default interface IAccountRepository {
  findOne(id: number): Promise<IAccount>;
  transaction(dataCashOut: IAccount, dataCashIn: IAccount): Promise<IAccount>;
}
