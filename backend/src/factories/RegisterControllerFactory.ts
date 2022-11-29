import RegisterController from '../controllers/RegisterController';
import { jwtTokenProvider, md5PasswordProvider } from '../providers';
import PrismaUserRepository from '../repositories/implementations/PrismaUserRepository';
import RegisterService from '../services/RegisterService';

export default class RegisterControllerFactory {
  static make() {
    const registerUserRepository = new PrismaUserRepository();
    const registerService = new RegisterService(
      md5PasswordProvider,
      registerUserRepository,
      jwtTokenProvider,
    );
    const registerController = new RegisterController(registerService);

    return registerController;
  }
}
