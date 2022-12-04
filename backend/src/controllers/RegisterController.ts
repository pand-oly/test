import { Request, Response } from 'express';
import RegisterService from '../services/RegisterService';

export default class RegisterController {
  constructor(private _registerService: RegisterService) {}

  async execute(req: Request, res: Response) {
    const token = await this._registerService.execute(req.body);
    return res.status(201).json({ token });
  }
}
