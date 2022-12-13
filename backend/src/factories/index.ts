import TransactionControllerFactory from './TransactionControllerFactory';
import LoginControllerFactory from './LoginControllerFactory';
import RegisterControllerFactory from './RegisterControllerFactory';

export const registerController = RegisterControllerFactory.make();

export const loginController = LoginControllerFactory.make();

export const transactionController = TransactionControllerFactory.make();
