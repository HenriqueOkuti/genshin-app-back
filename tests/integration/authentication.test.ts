import app, { init } from '../../source/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { createSession, createUser, findToken } from '../factories/authentication.factory';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /login', () => {
  it('should return status 400 when body is not given', async () => {
    const response = await server.post('/auth/login');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return status 400 when body is not valid', async () => {
    const invalidBody = {
      email: [faker.internet.email()],
      password: faker.internet.password(6),
    };

    const response = await server.post('/auth/login').send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('When body is valid', () => {
    it('should return status 401 when user is not registered', async () => {
      const validBody = {
        email: faker.internet.email(),
        password: faker.internet.password(6),
      };

      const response = await server.post('/auth/login').send(validBody);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should return status 401 when credentials are wrong, ', async () => {
      const validBody = {
        email: faker.internet.email(),
        password: faker.internet.password(6),
      };
      await createUser(validBody.email, validBody.password);

      validBody.password = faker.internet.password(7);

      const response = await server.post('/auth/login').send(validBody);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should return status 200 and create a new token if it already exists', async () => {
      const validBody = {
        email: faker.internet.email(),
        password: faker.internet.password(6),
      };
      const user = await createUser(validBody.email, validBody.password);
      const oldToken = await createSession(user.id);

      const response = await server.post('/auth/login').send(validBody);
      const newToken = await findToken(user.id);

      expect(response.status).toBe(httpStatus.OK);
      expect(newToken).not.toBe(oldToken);
    });

    it('should return status 200 and create a token if it does not exist', async () => {
      const validBody = {
        email: faker.internet.email(),
        password: faker.internet.password(6),
      };
      const response = await server.post('/auth/login').send(validBody);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe('POST /signup', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/signup');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = {
      name: [faker.internet.userName()],
      email: faker.internet.email(),
      password: faker.internet.password(6),
      confirmPassword: faker.internet.password(6),
    };

    const response = await server.post('/auth/signup').send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('When body is valid', () => {
    it('should return status 400 when the passwords dont match', async () => {
      const validBody = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        confirmPassword: faker.internet.password(6),
      };
      const response = await server.post('/auth/signup').send(validBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 409 when user already exists, ', async () => {
      const userPassword = faker.internet.password(6);

      const validBody = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: userPassword,
        confirmPassword: userPassword,
      };

      await createUser(validBody.email, validBody.password);

      const response = await server.post('/auth/signup').send(validBody);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('Should return status 201 when everything is valid', async () => {
      const userPassword = faker.internet.password(6);

      const validBody = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: userPassword,
        confirmPassword: userPassword,
      };

      const response = await server.post('/auth/signup').send(validBody);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});

describe('POST /github', () => {
  it('should do something', async () => {
    //test here
  });
});

describe('POST /google', () => {
  it('should do something', async () => {
    //test here
  });
});
