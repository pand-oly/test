import LoginController from '../controllers/LoginController';
import PrismaUserModel from '../prismaDatabase/models/PrismaUserModel';
import UserRepository from '../repositories/implementations/UserRepository';
import LoginService from '../services/LoginService';
import {
  jwtTokenProvider, md5PasswordProvider, zodAccessValidatorProvider,
} from '../providers';

export default class LoginControllerFactory {
  static make() {
    const userModel = new PrismaUserModel();
    const loginRepository = new UserRepository(userModel);
    const loginService = new LoginService(
      md5PasswordProvider,
      jwtTokenProvider,
      loginRepository,
      zodAccessValidatorProvider,
    );
    const loginController = new LoginController(loginService);

    return loginController;
  }
}
