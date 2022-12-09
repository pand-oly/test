import IAccess from '../entities/IAccess';
import { ErrorTypes } from '../errors/catalogErrors';
import IAccessValidatorProvider from '../providers/IAccessValidatorProvider';
import IPasswordProvider from '../providers/IPasswordProvider';
import ITokenGenerator from '../providers/ITokenGenerator';
import ILoginRepository from '../repositories/ILoginRepository';

export default class LoginService {
  constructor(
    private _passwordProvider: IPasswordProvider,
    private _tokenGeneratorProvider: ITokenGenerator,
    private _userRepository: ILoginRepository,
    private _accessValidatorProvider: IAccessValidatorProvider,
  ) {}

  async execute(data: IAccess): Promise<string> {
    await this._accessValidatorProvider.validator(data);

    const { username, password } = data;
    const hash = this._passwordProvider.encrypt(password);
    const user = await this._userRepository.findOne({ username, password: hash });

    if (!user) {
      throw new Error(ErrorTypes.NotUserFoundError);
    }

    const token = this._tokenGeneratorProvider.generator(user);
    return token;
  }
}
