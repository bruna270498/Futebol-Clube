import { Request, Response } from 'express';
import { teamService } from '../services';

const getAll = async (_req: Request, res: Response) => {
  const teams = await teamService.getAll();
  res.status(200).json(teams);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamService.getById(Number(id));
  res.status(200).json(team);
};

export default {
  getAll,
  getById,
};
