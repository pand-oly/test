import { Request, Response } from 'express';
import RegisterService from '../services/RegisterService';

export default class RegisterController {
  constructor(private _RegisterService: RegisterService) {}

  async execute(req: Request, res: Response) {
    // console.log(req.body, 'controller 1');
    const result = await this._RegisterService.execute(req.body);
    res.status(201).send(result);
  }
}
