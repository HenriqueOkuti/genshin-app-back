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

describe('PUT /users/info', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.put('/users/info');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.put('/users/info').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 400 when body is not valid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        invalidProperty: faker.lorem.word(),
      };

      const response = await server.put('/users/info').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when body data is not valid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        name: +faker.random.numeric(),
        email: faker.internet.email(),
        image: faker.internet.url(),
      };

      const response = await server.put('/users/info').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when everything is valid', () => {
      it('should return status 400 when trying to update email already in use', async () => {
        const newUser = await generateUser();
        const newUser2 = await generateUser();
        const token = await generateValidToken(newUser);

        await generateSession(newUser.id, token);

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = {
          name: faker.lorem.word(),
          email: newUser2.email,
          image: faker.internet.url(),
        };

        const response = await server.put('/users/info').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });

      it('should update user data and return updated info (name + email + image)', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);

        await generateSession(newUser.id, token);

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = {
          name: faker.lorem.word(),
          email: newUser.email,
          image: faker.internet.url(),
        };

        const response = await server.put('/users/info').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({ id: newUser.id, name: body.name, image: body.image });
      });
      //
    });

    //
  });
});
