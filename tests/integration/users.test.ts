import app, { init } from '../../source/app';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateUser, generateValidToken } from '../helpers';
import { createSession, createUser, findToken } from '../factories/authentication.factory';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /users/info', () => {
  it('should return status 400 when token is not given', async () => {
    const response = await server.get('/users/info');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return status 403 when token is not valid', async () => {
    const body = {
      headers: `Authorization ${faker.lorem.lines()}`,
    };
    const response = await server.get('/users/info').send(body);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 200 and user info', async () => {
      const newUser = generateUser();

      const body = {
        headers: `Authorization ${await generateValidToken()}`,
      };

      const response = await server.get('/users/info').send(body);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toBe({ newUser });
    });
  });
});
