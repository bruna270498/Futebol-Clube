import { Request, Response } from 'express';
import { matchService } from '../services';

const getAll = async (_req: Request, res: Response) => {
  const matches = await matchService.getAll();
  res.status(200).json(matches);
};

export default {
  getAll,
};
