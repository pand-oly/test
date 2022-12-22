import jwt from 'jsonwebtoken';
import { IUserPayload } from '../../entities/IUser';
import { ErrorTypes } from '../../errors/catalogErrors';
import ITokenVerify from '../ITokenVerify';
import ITokenGenerator from '../ITokenGenerator';

export default class JwtTokenProvider implements ITokenGenerator, ITokenVerify {
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

  public verifyToken(token: string | undefined): IUserPayload {
    if (!token) {
      throw new Error(ErrorTypes.NotFoundToken);
    }
    try {
      const result = this._jwt.verify(token, this._secret);
      return result as IUserPayload;
    } catch (error) {
      throw new Error(ErrorTypes.JsonWebTokenError);
    }
  }
}
