import { Router } from 'express';
import { leaderboardController } from '../controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.getAll);
leaderboardRouter.get('/:type', leaderboardController.getByType);

export { leaderboardRouter };

export default {
  leaderboardRouter,
};
