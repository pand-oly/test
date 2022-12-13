import ITransaction from '../entities/ITransaction';

export default interface ITransactionRepository {
  create(data: ITransaction): Promise<ITransaction>;
}
