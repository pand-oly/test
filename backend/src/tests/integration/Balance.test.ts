import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../../app';

import JwtTokenProvider from '../../providers/implementations/JwtTokenProvider';
import AccountRepository from '../../repositories/implementations/AccountRepository';
import Jwt from 'jsonwebtoken';

import { ACCOUNT_1_MOCK } from '../mocks/accountMocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test balance routes', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => sinon.restore());

  it('GET /balance - returns status code 200 and key balance', async () => {
    sinon.stub(JwtTokenProvider.prototype, 'verifyToken');
    sinon.stub(AccountRepository.prototype, 'findOne').resolves(ACCOUNT_1_MOCK);

    chaiHttpResponse = await chai.request(app)
      .get('/balance/1')
      .set('authorization', 'any-token');
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('balance')
  });

  it('GET /balance - returns status code 400 case invalid token', async () => {
    sinon.stub(Jwt, 'verify').throws();

    chaiHttpResponse = await chai.request(app)
      .get('/balance/1')
      .set('authorization', 'invalid-token');
    
    expect(chaiHttpResponse).to.have.status(400);
  })
});