import { Router } from 'express';
import { transactionController } from '../factories';

const accountRoute = Router();

accountRoute.put('/transaction', (req, res) => transactionController.execute(req, res));

export default accountRoute;
