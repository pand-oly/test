import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../../app';
import { USER_MOCK, ACCESS_VALID_MOCK } from '../mocks/userMocks';
import PrismaUserModel from '../../prismaDatabase/models/PrismaUserModel';
import jwt from 'jsonwebtoken';
import Md5PasswordProvider from '../../providers/implementations/Md5PasswordProvider';
import prismaConnection from '../../prismaDatabase/models/prismaConnection';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test login routes', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => sinon.restore());

  describe('POST /login success case', () => {
    it('Returns status code 200 and token', async () => {
      sinon.stub(PrismaUserModel.prototype, 'findOne').resolves(USER_MOCK);
      sinon.stub(jwt, 'sign').resolves('any_token');
      sinon.stub(Md5PasswordProvider.prototype, 'encrypt').returns('hash');
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(ACCESS_VALID_MOCK);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('POST /login fail case', () => {
    it('Returns status code 404 and message error', async () => {
      sinon.stub(prismaConnection.users, 'findFirst').throws();
      sinon.stub(Md5PasswordProvider.prototype, 'encrypt').returns('hash');
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(ACCESS_VALID_MOCK);

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.contain({ error: 'No User found error' });
    });
  });

  describe('POST /login test parameters', () => {
    it('Returns status code 400 if the parameters do not have username', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          password: 'Password_1',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if the username is not less than 3', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'U',
          password: 'Password_1',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if the parameters do not have password', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'User',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if the parameters do not have password', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'User',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if the password is not less than 8', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'User',
          password: 'P',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if the username is greater than 3', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'U',
          password: 'Password_1',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if password has at least one capital letter', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'User',
          password: 'password_1',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Returns status code 400 if password has at least one number', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          username: 'User',
          password: 'Password',
        });

        expect(chaiHttpResponse).to.have.status(400);
    });
  });
});
