import { Request, Response } from 'express';
import { matchService } from '../services';
import { ITeamFilter, IMatchResult } from '../commons/interfaces';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const filter = {} as ITeamFilter;
  if (inProgress !== undefined) {
    filter.inProgress = inProgress === 'true';
  }
  const matches = await matchService.getAll(filter);
  res.status(200).json(matches);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchService.finishMatch(Number(id));
  res.status(200).json({ message: 'Finished' });
};

const updateMatchResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const matchResult = { homeTeamGoals, awayTeamGoals } as IMatchResult;
  await matchService.updateMatchResult(Number(id), matchResult);
  res.status(200).json({ message: 'Result Updated' });
};

export default {
  getAll,
  finishMatch,
  updateMatchResult,
};
