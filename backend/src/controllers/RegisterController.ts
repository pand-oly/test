import { Request, Response } from 'express';
import RegisterService from '../services/RegisterService';

export default class RegisterController {
  constructor(private _RegisterService: RegisterService) {}

  async execute(req: Request, res: Response) {
    const token = await this._RegisterService.execute(req.body);
    res.status(201).json({ token });
  }
}
