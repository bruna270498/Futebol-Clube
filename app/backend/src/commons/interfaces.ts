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
