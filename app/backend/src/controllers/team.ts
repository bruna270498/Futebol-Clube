import { Request, Response } from 'express';
import { teamService } from '../services';

const getAll = async (_req: Request, res: Response) => {
  const teams = await teamService.getAll();
  console.log(teams);
  res.status(200).json(teams);
};

export default {
  getAll,
};
