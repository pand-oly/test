import GetTransactionController from '../controllers/GetTransactionsController';
import PrismaTransactionModel from '../prismaDatabase/models/PrismaTransactionModel';
import { jwtTokenProvider } from '../providers';
import TransactionRepository from '../repositories/implementations/TransactionRepository';
import GetTransactionsService from '../services/GetTransactionsService';

export default class GetTransactionControllerFactory {
  static make() {
    const prismaTransactionModel = new PrismaTransactionModel();
    const transactionRepository = new TransactionRepository(prismaTransactionModel);
    const getTransactionsService = new GetTransactionsService(
      transactionRepository,
      jwtTokenProvider,
    );
    const getTransactionController = new GetTransactionController(getTransactionsService);

    return getTransactionController;
  }
}
