import Match from '../database/models/Match';
import { ITeamFilter } from '../commons/interfaces';

const getAll = async (filters: ITeamFilter) => {
  const where = {} as ITeamFilter;
  if (filters.inProgress !== undefined) {
    where.inProgress = filters.inProgress;
  }
  const matches = await Match.findAll({
    where: { ...where },
    include: [
      { association: 'homeTeam', attributes: ['teamName'] },
      { association: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  return matches;
};

export default {
  getAll,
};
