import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

const sandbox = sinon.createSandbox();

describe('Testa os endpoints de Teams', () => {
 
  it('Verifica se ao chamar o endpoint "/teams", é retornado todos os times.', async () => {
    sandbox.stub(Team, 'findAll').resolves(mocks.allTeams.map((team) => new Team(team)));
    const response = await chai
       .request(app)
       .get('/teams');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mocks.allTeams);
  });

  it('Verifica se ao chamar o endpoint "/teams/:id", é retornado o time com o id passado.', async () => {
    const id = 1;
    sandbox.stub(Team, 'findByPk').resolves(new Team(mocks.allTeams.find((team) => team.id === id)));
    const response = await chai
       .request(app)
       .get(`/teams/${id}`);

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mocks.allTeams[0]);
  });
});
