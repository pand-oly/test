import IAccess from '../entities/IAccess';
import { ErrorTypes } from '../errors/catalogErrors';
import IPasswordProvider from '../providers/IPasswordProvider';
import ITokenGenerator from '../providers/ITokenGenerator';
import ILoginRepository from '../repositories/ILoginRepository';

export default class LoginService {
  constructor(
    private _passwordProvider: IPasswordProvider,
    private _tokenGeneratorProvider: ITokenGenerator,
    private _userRepository: ILoginRepository,
  ) {}

  async execute(data: IAccess): Promise<string> {
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
