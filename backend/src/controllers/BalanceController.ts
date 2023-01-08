import { Request, Response } from 'express';
import BalanceService from '../services/BalanceService';

export default class BalanceController {
  constructor(private _balanceService: BalanceService) {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const balance = await this._balanceService.execute(id, authorization);

    return res.status(200).json({ balance });
  }
}
