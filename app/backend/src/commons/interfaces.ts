export interface ITeamFilter {
  inProgress: boolean;
}

export interface IMatchResult {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IScoreResult {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
