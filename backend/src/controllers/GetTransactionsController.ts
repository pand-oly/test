import { Request, Response } from 'express';
import GetTransactionsService from '../services/GetTransactionsService';

export default class GetTransactionController {
  constructor(private _transactionService: GetTransactionsService) {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const result = await this._transactionService.execute(id, authorization);
    return res.status(200).json(result);
  }
}
