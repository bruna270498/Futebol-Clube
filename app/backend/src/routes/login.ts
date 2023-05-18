import { Router } from 'express';
import { loginController } from '../controllers';
import { loginMiddleware } from '../middlewares';

const loginRouter = Router();

loginRouter.post('/', [
  loginMiddleware.validateLogin,
  loginController.login,
]);

loginRouter.get('/role', [
  loginMiddleware.validateToken,
  loginController.getUserRoleByToken,
]);

export { loginRouter };

export default {
  loginRouter,
};
