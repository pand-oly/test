import TransactionController from '../controllers/TransactionController';
import PrismaAccountModel from '../prismaDatabase/models/PrismaAccountModel';
import PrismaTransactionModel from '../prismaDatabase/models/PrismaTransactionModel';
import AccountRepository from '../repositories/implementations/AccountRepository';
import TransactionRepository from '../repositories/implementations/TransactionRepository';
import TransactionService from '../services/TransactionService';
import { jwtTokenProvider } from '../providers';

export default class TransactionControllerFactory {
  static make() {
    const accountModel = new PrismaAccountModel();
    const transactionModel = new PrismaTransactionModel();
    const accountRepository = new AccountRepository(accountModel);
    const transactionRepository = new TransactionRepository(transactionModel);
    const transactionService = new TransactionService(
      accountRepository,
      transactionRepository,
      jwtTokenProvider,
    );
    const transactionController = new TransactionController(transactionService);

    return transactionController;
  }
}
