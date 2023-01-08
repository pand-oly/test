import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../../app';
import AccountRepository from '../../repositories/implementations/AccountRepository';
import TransactionRepository from '../../repositories/implementations/TransactionRepository';
import JwtTokenProvider from '../../providers/implementations/JwtTokenProvider';
import jwt from 'jsonwebtoken';

import { RETURNS_TRANSACTION_SUCCESS, TRANSACTION_SEND_BODY } from '../mocks/transactionMock';
import { ACCOUNT_1_MOCK, ACCOUNT_2_LITTLE_BALANCE_MOCK, ACCOUNT_2_MOCK } from '../mocks/accountMocks';
import PrismaAccountModel from '../../prismaDatabase/models/PrismaAccountModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test transaction route', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => sinon.restore());

  describe('PUT /transaction, success case', () => {
    it('Returns an object with transaction info', async () => {
      sinon.stub(JwtTokenProvider.prototype, 'verifyToken'); 
      sinon.stub(PrismaAccountModel.prototype, 'findOne')
        .onCall(0).resolves(ACCOUNT_1_MOCK)
        .onCall(1).resolves(ACCOUNT_2_MOCK);
      sinon.stub(AccountRepository.prototype, 'transaction') //TODO
      sinon.stub(TransactionRepository.prototype, 'create').resolves(RETURNS_TRANSACTION_SUCCESS);

      chaiHttpResponse = await chai.request(app)
        .put('/transaction')
        .send(TRANSACTION_SEND_BODY)
        .set('authorization', 'any-token');

      expect(chaiHttpResponse.body)
        .to.be.keys('id', 'debitedAccountId', 'creditedAccountId', 'value', 'createdAt');
    });
  });

  describe('PUT /transaction, fail token', () => {
    it('If token is undefined, returns erro with status code 404', async () => {
      chaiHttpResponse = await chai.request(app)
        .put('/transaction')
        .send(TRANSACTION_SEND_BODY);

        expect(chaiHttpResponse).to.have.status(404);
        expect(chaiHttpResponse.body).to.be.contains({ error: 'Valid token required' });
    });

    it('If token is invalid, returns erro with status code 400', async () => {
      sinon.stub(jwt, 'verify').throws();
      chaiHttpResponse = await chai.request(app)
        .put('/transaction')
        .send(TRANSACTION_SEND_BODY)
        .set('authorization', 'invalid-token');

        expect(chaiHttpResponse).to.have.status(400);
        expect(chaiHttpResponse.body).to.be.contains({ error: 'Invalid token' });
    });
  });

  describe('PUT /transaction, failure cases', () => {
    it('If it does not find the cash in user it throws an error', async () => {
      sinon.stub(JwtTokenProvider.prototype, 'verifyToken'); 
      sinon.stub(PrismaAccountModel.prototype, 'findOne')
        .onCall(0).resolves(ACCOUNT_1_MOCK)
        .onCall(1).throws();

      chaiHttpResponse = await chai.request(app)
        .put('/transaction')
        .send(TRANSACTION_SEND_BODY)
        .set('authorization', 'any-token');
      
      expect(chaiHttpResponse).to.have.status(404);
    });
    
    it('in case cash out user does not have enough credit lan an error', async () => {
      sinon.stub(JwtTokenProvider.prototype, 'verifyToken');
      sinon.stub(PrismaAccountModel.prototype, 'findOne').resolves(ACCOUNT_2_LITTLE_BALANCE_MOCK);

      chaiHttpResponse = await chai.request(app)
        .put('/transaction')
        .send(TRANSACTION_SEND_BODY)
        .set('authorization', 'any-token');
      
      expect(chaiHttpResponse).to.have.status(401);
    })
  });

  describe('GET /transaction, success case', () => {
    it('Resturns status code 200', async () => {
      sinon.stub(JwtTokenProvider.prototype,  'verifyToken');
      sinon.stub(TransactionRepository.prototype, 'findAll')
        .resolves([RETURNS_TRANSACTION_SUCCESS]);
      
      chaiHttpResponse = await chai.request(app)
        .get('/transaction')
        .set('authorization', 'any-token');
      
      expect(chaiHttpResponse).to.have.status(200);
    });

  });

  describe('GET /transaction, success case', () => {
    it('Returns status code 400 case invalid token', async () => {
      sinon.stub(jwt, 'verify').throws();
      chaiHttpResponse = await chai.request(app)
        .get('/transaction')
        .set('authorization', 'invalid-token');

      expect(chaiHttpResponse).to.have.status(400);
    });
  });
});
