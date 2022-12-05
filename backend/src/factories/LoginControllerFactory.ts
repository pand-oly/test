import LoginController from '../controllers/LoginController';
import PrismaUserModel from '../prismaDatabase/models/PrismaUserModel';
import { jwtTokenProvider, md5PasswordProvider } from '../providers';
import UserRepository from '../repositories/implementations/UserRepository';
import LoginService from '../services/LoginService';

export default class LoginControllerFactory {
  static make() {
    const userModel = new PrismaUserModel();
    const loginRepository = new UserRepository(userModel);
    const loginService = new LoginService(md5PasswordProvider, jwtTokenProvider, loginRepository);
    const loginController = new LoginController(loginService);

    return loginController;
  }
}
