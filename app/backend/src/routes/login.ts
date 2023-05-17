import { Router } from 'express';
import { loginController } from '../controllers';
import { loginMiddleware } from '../middlewares';

const loginRouter = Router();

loginRouter.post('/', [
  loginMiddleware.validateLogin,
  loginController.login,
]);

export { loginRouter };

export default {
  loginRouter,
};
