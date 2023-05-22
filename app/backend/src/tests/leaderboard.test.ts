import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

const sandbox = sinon.createSandbox();

describe('Testa os endpoints de Leaderboard', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('Verifica se ao chamar o endpoint "/leaderboard/home", é retornado corretamente.', async () => {
    sandbox.stub(Match, 'findAll').resolves(mocks.allMatches as Match[]);
    sandbox.stub(Team, 'findAll').resolves(mocks.allTeams as Team[]);

    const response = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mocks.leaderBoard.leaderBoardHomeResult);
  });
  it('Verifica se ao chamar o endpoint "/leaderboard/away", é retornado corretamente.', async () => {
    sandbox.stub(Match, 'findAll').resolves(mocks.allMatches as Match[]);
    sandbox.stub(Team, 'findAll').resolves(mocks.allTeams as Team[]);

    const response = await chai
      .request(app)
      .get('/leaderboard/away');


    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mocks.leaderBoard.leaderBoardAwayResult);
  });
  it('Verifica se ao chamar o endpoint "/leaderboard", é retornado corretamente.', async () => {
    sandbox.stub(Match, 'findAll').resolves(mocks.allMatches as Match[]);
    sandbox.stub(Team, 'findAll').resolves(mocks.allTeams as Team[]);

    const response = await chai
      .request(app)
      .get('/leaderboard');


    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mocks.leaderBoard.leaderBoardFullResult);
  });
});
