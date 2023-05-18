import { Router } from 'express';
import { matchController } from '../controllers';

const matchRouter = Router();

matchRouter.get('/', matchController.getAll);

export { matchRouter };

export default {
  matchRouter,
};
