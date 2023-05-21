import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

const sandbox = sinon.createSandbox();

describe('Testa os endpoints de Matches', () => {
  afterEach(() => {
    sandbox.restore();
  });
  
  it('Verifica se ao chamar o endpoint "/matches", é retornado todas as partidas.', async () => {
    sandbox.stub(Match, 'findAll').resolves(mocks.allMatches as any);
    const response = await chai
       .request(app)
       .get('/matches');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mocks.allMatches);
  });

  it('Verifica se ao chamar o endpoint "/matches", é retornado todas as partidas em andamento.', async () => {
    sandbox.stub(Match, 'findAll').resolves(mocks.allMatches
      .filter((match) => match.inProgress)
      .map((match) => new Match(match)));
    const response = await chai
       .request(app)
       .get('/matches?inProgress=true');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.an('array');
    response.body.forEach((match: any) => {
      expect(match.inProgress).to.be.eq(true);
    });
  });

  it('Verifica se ao chamar o endpoint "/matches", é retornado todas as partidas finalizadas.', async () => {
    sandbox.stub(Match, 'findAll').resolves(mocks.allMatches
      .filter((match) => !match.inProgress)
      .map((match) => new Match(match)));
    const response = await chai
       .request(app)
       .get('/matches?inProgress=false');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.an('array');
    response.body.forEach((match: any) => {
      expect(match.inProgress).to.be.eq(false);
    });
  });
});
