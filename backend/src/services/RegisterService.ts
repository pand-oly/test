import IAccess from '../entities/IAccess';
import IPasswordProvider from '../providers/IPasswordProvider';
import ITokenGenerator from '../providers/ITokenGenerator';
import IRegisterUserRepository from '../repositories/IRegisterUserRepository';

export default class RegisterService {
  constructor(
    private _passwordProvider: IPasswordProvider,
    private _registerUserRepository: IRegisterUserRepository,
    private _tokenGeneratorProvider: ITokenGenerator,
  ) {}

  async execute(data: IAccess) {
    const hash = this._passwordProvider.encrypt(data.password);
    const user = await this._registerUserRepository.create({
      password: hash, username: data.username,
    });
    // gera um token
    const token = this._tokenGeneratorProvider.generator(user);
    return token;
  }
}
