import { Router } from 'express';
import { teamController } from '../controllers';

const teamRouter = Router();

teamRouter.get('/', teamController.getAll);

export { teamRouter };

export default {
  teamRouter,
};
