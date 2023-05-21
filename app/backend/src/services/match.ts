import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ITeamFilter, IMatchResult, IMatch } from '../commons/interfaces';
import { UnprocessableEntity, NotFound } from '../commons/errors';

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

const finishMatch = async (matchId: number) => {
  const match = await Match.findByPk(matchId);
  if (match) {
    match.inProgress = false;
    await match.save();
  }
  return match;
};

const updateMatchResult = async (matchId: number, matchResult: IMatchResult) => {
  const match = await Match.findByPk(matchId);
  if (match) {
    match.homeTeamGoals = matchResult.homeTeamGoals;
    match.awayTeamGoals = matchResult.awayTeamGoals;
    await match.save();
  }
  return match;
};

const insertMatch = async (match: IMatch) => {
  const { homeTeamId, awayTeamId } = match;
  if (homeTeamId === awayTeamId) {
    throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
  }

  const [homeTeam, awayTeam] = await Promise.all([
    Team.findByPk(homeTeamId),
    Team.findByPk(awayTeamId),
  ]);

  if (!homeTeam || !awayTeam) {
    throw new NotFound('There is no team with such id!');
  }

  const createdMatch = new Match({ ...match, inProgress: true });
  await createdMatch.save();
  return createdMatch;
};

export default {
  getAll,
  finishMatch,
  updateMatchResult,
  insertMatch,
};
