import { Router } from 'express';
import registerController from '../factories';

const registerRoute = Router();

registerRoute.post('/register', (req, res) => registerController.execute(req, res));

export default registerRoute;
