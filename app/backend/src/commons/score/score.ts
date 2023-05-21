import Match from '../../database/models/Match';

export class Score {
  declare name: string;
  declare totalPoints: number;
  declare totalGames: number;
  declare totalVictories: number;
  declare totalDraws: number;
  declare totalLosses: number;
  declare goalsFavor: number;
  declare goalsOwn: number;
  declare goalsBalance: number;
  declare efficiency: number;

  constructor(name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  addWin() {
    this.totalPoints += 3;
    this.totalVictories += 1;
  }

  addLoss() {
    this.totalLosses += 1;
  }

  addDraw() {
    this.totalPoints += 1;
    this.totalDraws += 1;
  }

  updateEfficiency() {
    this.efficiency = this.totalPoints / this.totalGames;
  }

  addGoals(goalsFavor: number, goalsOwn: number) {
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  parseMatch(match: Match) {
    this.totalGames += 1;
    const isHomeTeam = match.homeTeam.teamName === this.name;
    const goalsFavor = isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
    const goalsOwn = isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;

    if (goalsFavor > goalsOwn) {
      this.addWin();
    } else if (goalsFavor < goalsOwn) {
      this.addLoss();
    } else {
      this.addDraw();
    }
    this.addGoals(goalsFavor, goalsOwn);
    this.updateEfficiency();
  }
}

export default Score;
