import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

const sandbox = sinon.createSandbox();

describe('Testa os endpoints de Login', () => {
  afterEach(() => {
    sandbox.restore();
  });
  it('Verifica se é possível executar o login utilizando credenciais válidas com sucesso.', async () => {
    sandbox.stub(User, 'findOne').resolves(mocks.user as User);
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
        password: '123456',
      });

    expect(response.status).to.be.eq(200);
    expect(response.body.token).to.be.a('string');
  });

  it('Verifica se é retornado erro quando tenta executar login faltando email.', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'wrong_password',
      });

    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.be.eq('All fields must be filled');
  });

  it('Verifica se é retornado erro quando tenta executar login faltando senha.', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
      });
    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.be.eq('All fields must be filled');
  });

  it('Verifica se é retornado erro quando tenta executar login com senha invalida.', async () => {
    sandbox.stub(User, 'findOne').resolves(mocks.user as User);
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
        password: 'wrong_password',
      });
    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.be.eq('Invalid email or password');
  });

  it('Verifica se é retornado erro quando tenta executar login com senha muito curta.', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
        password: 'short',
      });
    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.be.eq('Invalid email or password');
  });

  it('Verifica se é retornado erro quando tenta executar login com e-mail invalido.', async () => {
    sandbox.stub(User, 'findOne').resolves(null);
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
        password: '123456',
      });
    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.be.eq('Invalid email or password');
  });

  it('Verifica se é retornado erro quando tenta executar login com e-mail invalido.', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe',
        password: '123456',
      });
    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.be.eq('Invalid email or password');
  });

  it('Verifica se é retornado o papel do usuário quando é feito o GET na rota /login/role', async () => {
    sandbox.stub(User, 'findOne').resolves(mocks.user as User);
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
        password: '123456',
      });

    
    const response = await chai
      .request(app)
      .get('/login/role')
      .set("authorization", token);
    
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ role: 'admin' });
  });

  it('Verifica se é retornado o papel do usuário quando é feito o GET na rota /login/role', async () => {
    sandbox.stub(User, 'findOne').resolves(mocks.user as User);
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'bruna@trybe.com',
        password: '123456',
      });
      
    sandbox.restore();
    sandbox.stub(User, 'findOne').resolves(null);

    const response = await chai
      .request(app)
      .get('/login/role')
      .set("authorization", token);
    
    expect(response.status).to.be.eq(401);
    expect(response.body).to.be.deep.eq({ message: 'Token not found' });
  });
});
