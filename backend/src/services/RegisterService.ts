import IRegister from '../entities/IRegister';
import IPasswordProvider from '../providers/IPasswordProvider';
import ITokenGenerator from '../providers/ITokenGenerator';
import IRegisterUserRepository from '../repositories/IRegisterUserRepository';

export default class RegisterService {
  constructor(
    private _passwordProvider: IPasswordProvider,
    private _registerUserRepository: IRegisterUserRepository,
    private _tokenGeneratorProvider: ITokenGenerator,
  ) {}

  async execute(data: IRegister) {
    // console.log(data, 'service 2');
    // hash senha
    const hash = this._passwordProvider.encrypt(data.password);
    // console.log(data, 'service 3');
    // registra no banco de dados
    const user = await this._registerUserRepository.create({
      password: hash, username: data.username,
    });
    console.log(user);
    return user;
    // gera um token
    // const token = this._tokenGeneratorProvider.generator({});
  }
}