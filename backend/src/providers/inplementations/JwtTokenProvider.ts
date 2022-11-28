import jwt from 'jsonwebtoken';
import { IUserPayload } from '../../entities/IUser';
import ITokenGenerator from '../ITokenGenerator';

export default class JwtTokenProvider implements ITokenGenerator {
  private _jwt;
  private _secret: string;
  private _singOptions: jwt.SignOptions;
  constructor() {
    this._jwt = jwt;
    this._secret = process.env.JWT_SECRET as string;
    this._singOptions = { expiresIn: '1d' };
  }

  public generator(payload: IUserPayload): string {
    const token = this._jwt.sign(payload, this._secret, this._singOptions);
    return token;
  }
}
