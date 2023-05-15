import { Router } from 'express';
import { teamController } from '../controllers';

const teamRouter = Router();

teamRouter.get('/', teamController.getAll);
teamRouter.get('/:id', teamController.getById);

export { teamRouter };

export default {
  teamRouter,
};
