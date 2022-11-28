import md5 from 'md5';
import IPasswordProvider from '../IPasswordProvider';

export default class Md5PasswordProvider implements IPasswordProvider {
  private _md5;
  constructor() { this._md5 = md5; }

  public encrypt(password: string): string {
    const hash = this._md5(password);
    return hash;
  }
}
