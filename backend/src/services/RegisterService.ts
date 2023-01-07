import IAccess from '../entities/IAccess';
import IAccessValidatorProvider from '../providers/IAccessValidatorProvider';
import IPasswordProvider from '../providers/IPasswordProvider';
import ITokenGenerator from '../providers/ITokenGenerator';
import IRegisterUserRepository from '../repositories/IRegisterUserRepository';

export default class RegisterService {
  constructor(
    private _passwordProvider: IPasswordProvider,
    private _registerUserRepository: IRegisterUserRepository,
    private _tokenGeneratorProvider: ITokenGenerator,
    private _accessValidatorProvider: IAccessValidatorProvider,
  ) {}

  async execute(data: IAccess) {
    await this._accessValidatorProvider.validator(data);
    const hash = this._passwordProvider.encrypt(data.password);
    const user = await this._registerUserRepository.create({
      password: hash, username: data.username,
    });
    const token = this._tokenGeneratorProvider.generator(user);
    return { token, username: user.username, accountId: user.accountId };
  }
}
