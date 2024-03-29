import { Router } from 'express';
import { matchController } from '../controllers';
import loginMiddleware from '../middlewares/login';

const matchRouter = Router();

matchRouter.get('/', matchController.getAll);

matchRouter.patch('/:id/finish', [
  loginMiddleware.validateToken,
  matchController.finishMatch,
]);

matchRouter.patch('/:id', [
  loginMiddleware.validateToken,
  matchController.updateMatchResult,
]);

matchRouter.post('/', [
  loginMiddleware.validateToken,
  matchController.insertMatch,
]);

export { matchRouter };

export default {
  matchRouter,
};
