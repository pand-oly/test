import { Router } from 'express';
import { transactionController, getTransactionController } from '../factories';

const accountRoute = Router();

accountRoute.put('/transaction', (req, res) => transactionController.execute(req, res));
accountRoute.get('/transaction/:id', (req, res) => getTransactionController.execute(req, res));

export default accountRoute;
