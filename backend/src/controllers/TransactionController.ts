import { Request, Response } from 'express';
import TransferService from '../services/TransactionService';

export default class TransactionController {
  constructor(private _cashTransferService: TransferService) {}

  async execute(req: Request, res: Response) {
    const result = await this._cashTransferService.execute(req.body);
    res.status(200).json(result);
  }
}
