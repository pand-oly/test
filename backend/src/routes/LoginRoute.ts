import { Router } from 'express';
import { loginController } from '../factories';

const loginRoute = Router();

loginRoute.post('/login', (req, res) => loginController.execute(req, res));

export default loginRoute;
