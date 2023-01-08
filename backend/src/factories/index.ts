import TransactionControllerFactory from './TransactionControllerFactory';
import LoginControllerFactory from './LoginControllerFactory';
import RegisterControllerFactory from './RegisterControllerFactory';
import BalanceControllerFactory from './BalanceControllerFactory';

export const registerController = RegisterControllerFactory.make();

export const loginController = LoginControllerFactory.make();

export const transactionController = TransactionControllerFactory.make();

export const balanceController = BalanceControllerFactory.make();
