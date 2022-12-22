import { Request, Response } from 'express';
import TransferService from '../services/TransactionService';

export default class TransactionController {
  constructor(private _transactionService: TransferService) {}

  async execute(req: Request, res: Response) {
    const { authorization } = req.headers;
    const result = await this._transactionService.execute(req.body, authorization);
    return res.status(200).json(result);
  }
}
