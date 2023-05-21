import { Score } from './score';

export class ScoreBoard {
  declare scores: Array<Score>;

  constructor() {
    this.scores = [];
  }

  addScore(score: Score) {
    this.scores.push(score);
    this.sortScores();
  }

  getScores() {
    return this.scores;
  }

  sortScores() {
    this.scores.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      return b.goalsFavor - a.goalsFavor;
    });
  }
}

export default ScoreBoard;
