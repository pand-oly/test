import RegisterController from '../controllers/RegisterController';
import PrismaUserModel from '../prismaDatabase/models/PrismaUserModel';
import { jwtTokenProvider, md5PasswordProvider } from '../providers';
import UserRepository from '../repositories/implementations/UserRepository';
import RegisterService from '../services/RegisterService';

export default class RegisterControllerFactory {
  static make() {
    const userModel = new PrismaUserModel();
    const registerUserRepository = new UserRepository(userModel);
    const registerService = new RegisterService(
      md5PasswordProvider,
      registerUserRepository,
      jwtTokenProvider,
    );
    const registerController = new RegisterController(registerService);

    return registerController;
  }
}
