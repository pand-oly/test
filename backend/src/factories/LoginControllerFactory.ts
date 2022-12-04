import LoginController from '../controllers/LoginController';
import { jwtTokenProvider, md5PasswordProvider } from '../providers';
import PrismaUserRepository from '../repositories/implementations/PrismaUserRepository';
import LoginService from '../services/LoginService';

export default class LoginControllerFactory {
  static make() {
    const loginRepository = new PrismaUserRepository();
    const loginService = new LoginService(md5PasswordProvider, jwtTokenProvider, loginRepository);
    const loginController = new LoginController(loginService);

    return loginController;
  }
}
