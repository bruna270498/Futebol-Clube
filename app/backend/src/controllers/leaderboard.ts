import { Request, Response } from 'express';
import { leaderboardService } from '../services';
import { IScoreResult } from '../commons/interfaces';

const getByType = async (req: Request, res: Response) => {
  const { type } = req.params;
  const results = await leaderboardService.getByType(type as string);
  res.status(200).send(results);
};

export default {
  getByType,
};
