import RegisterController from '../controllers/RegisterController';
import PrismaUserModel from '../prismaDatabase/models/PrismaUserModel';
import UserRepository from '../repositories/implementations/UserRepository';
import RegisterService from '../services/RegisterService';
import {
  jwtTokenProvider, md5PasswordProvider, zodAccessValidatorProvider,
} from '../providers';

export default class RegisterControllerFactory {
  static make() {
    const userModel = new PrismaUserModel();
    const registerUserRepository = new UserRepository(userModel);
    const registerService = new RegisterService(
      md5PasswordProvider,
      registerUserRepository,
      jwtTokenProvider,
      zodAccessValidatorProvider,
    );
    const registerController = new RegisterController(registerService);

    return registerController;
  }
}
