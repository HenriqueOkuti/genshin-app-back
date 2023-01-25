import app, { init } from '../../source/app';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateSession, generateUser, generateValidToken } from '../helpers';
import { createSession, createUser, findToken } from '../factories/authentication.factory';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /users/info', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.get('/users/info');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.get('/users/info').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 200 and user info', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.get('/users/info').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ id: newUser.id, name: newUser.name, email: newUser.email, image: newUser.image });
    });
  });
});
