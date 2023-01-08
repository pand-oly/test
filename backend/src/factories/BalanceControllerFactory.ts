import BalanceController from '../controllers/BalanceController';
import PrismaAccountModel from '../prismaDatabase/models/PrismaAccountModel';
import { jwtTokenProvider } from '../providers';
import AccountRepository from '../repositories/implementations/AccountRepository';
import BalanceService from '../services/BalanceService';

export default class BalanceControllerFactory {
  static make() {
    const accountModel = new PrismaAccountModel();
    const accountRepository = new AccountRepository(accountModel);
    const balanceService = new BalanceService(accountRepository, jwtTokenProvider);
    const balanceController = new BalanceController(balanceService);

    return balanceController;
  }
}
