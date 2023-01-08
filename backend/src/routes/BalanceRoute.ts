import { Router } from 'express';
import { balanceController } from '../factories';

const balanceRoute = Router();

balanceRoute.get('/balance/:id', (req, res) => balanceController.execute(req, res));

export default balanceRoute;
