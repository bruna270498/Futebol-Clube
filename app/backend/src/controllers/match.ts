import { Request, Response } from 'express';
import { matchService } from '../services';
import { ITeamFilter } from '../commons/interfaces';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const filter = {} as ITeamFilter;
  if (inProgress !== undefined) {
    filter.inProgress = inProgress === 'true';
  }
  const matches = await matchService.getAll(filter);
  res.status(200).json(matches);
};

export default {
  getAll,
};
