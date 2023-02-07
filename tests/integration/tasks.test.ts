import app, { init } from '../../source/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateSession, generateUser, generateValidToken } from '../helpers';
import {
  createNewUserInvalidTaskBody,
  createNewUserTaskBody,
  createUserTask,
  invalidModifyUserTask,
  validModifyUserTask,
} from '../factories/tasks.factory';

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

describe('GET /tasks/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.get('/tasks/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.get('/tasks/user').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 200 and user tasks (filled)', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const userTask = await createUserTask(newUser.id);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.get('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe('POST /tasks/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.post('/tasks/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.post('/tasks/user').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 400 when there is no body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.post('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when body is invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        invalidData: 1,
      };

      const response = await server.post('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when something is invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const invalidBody = await createNewUserInvalidTaskBody();

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = invalidBody;

      const response = await server.post('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('When everything is valid', () => {
      it('should return status 201 when everything is fine', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);
        const validBody = await createNewUserTaskBody();

        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = validBody;

        const response = await server.post('/tasks/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.CREATED);
      });
    });
  });
});

describe('PUT /tasks/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.put('/tasks/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.put('/tasks/user').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 400 when there is no body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when body is invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        invalidData: 1,
      };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when doing something invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const userTask = await createUserTask(newUser.id);
      const invalidModifiedTask = await invalidModifyUserTask(userTask);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = invalidModifiedTask;

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 404 when user task does not exist', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const userTask = await createUserTask(newUser.id);
      const invalidModifiedTask = await validModifyUserTask(userTask);
      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = { ...invalidModifiedTask, taskId: 0 };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    describe('When everything is valid', () => {
      it('should return status 200 when everything is fine', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);
        const userTask = await createUserTask(newUser.id);
        const validModifiedTask = await validModifyUserTask(userTask);
        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = validModifiedTask;

        const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.OK);
      });
    });
  });
});

describe('DELETE /tasks/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.delete('/tasks/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.delete('/tasks/user').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 400 when there is no body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.delete('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when body is invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        invalidData: 1,
      };

      const response = await server.delete('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 403 when trying to delete task from other user', async () => {
      const newUser1 = await generateUser();
      const newUser2 = await generateUser();
      const token = await generateValidToken(newUser1);
      const user1Task = await createUserTask(newUser1.id);
      const user2Task = await createUserTask(newUser2.id);

      await generateSession(newUser1.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        taskId: user2Task.taskId,
      };

      const response = await server.delete('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('When everything is valid', () => {
      it('should return status 200 when everything is fine and delete the task', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);
        const userTask = await createUserTask(newUser.id);

        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = {
          taskId: userTask.taskId,
        };

        const response = await server.delete('/tasks/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.OK);
      });
    });
  });
});
