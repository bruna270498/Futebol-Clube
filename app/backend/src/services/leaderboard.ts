import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { Score } from '../commons/score/score';
import { ScoreBoard } from '../commons/score/scoreBoard';

const filterMatchesByType = (
  teamId: number,
  matches: Array<Match>,
  type: string | undefined,
) => matches.filter((match) => {
  const teamIds = [];
  if (!type || type === 'home') {
    teamIds.push(match.homeTeamId);
  }

  if (!type || type === 'away') {
    teamIds.push(match.awayTeamId);
  }

  return teamIds.includes(teamId);
});

const getByType = async (type?: string) => {
  const teams = await Team.findAll();
  const matches = await Match.findAll({
    where: { inProgress: false },
    include: [
      { association: 'homeTeam', attributes: ['teamName'] },
      { association: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  const scoreBoard = new ScoreBoard();
  teams.forEach((team) => {
    const score = new Score(team.teamName);
    const teamMatches = filterMatchesByType(team.id, matches, type);
    teamMatches.forEach((match) => score.parseMatch(match));
    scoreBoard.addScore(score);
  });
  return scoreBoard.getScores();
};

export default {
  getByType,
};
