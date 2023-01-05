import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private _loginService: LoginService) {}

  async execute(req: Request, res: Response) {
    const result = await this._loginService.execute(req.body);
    return res.status(200).json(result);
  }
}
