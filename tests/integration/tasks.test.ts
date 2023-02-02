import app, { init } from '../../source/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateSession, generateUser, generateValidToken } from '../helpers';
import {
  createCharacter,
  createCharacterWithDetails,
  createMultipleCharacters,
  createUserCharacter,
} from '../factories/characters.factory';

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

//console.log('')
//CREATE TABLES:            OKOKOKOKOK
//create temporary tasks tables to manipulate on POST and PUT methods
//for every time user wants to post/put in the front
//insert into temporary 'tempTransaction" table: userId, name, image, isPost, isPut, originalTaskId (allow null)
//(userId can be unique for index)
//insert into temporary 'tempItems' table: tempTransactionId, isWeekly, isBoss, isLocal, isEnemy, isDungeon, rarity, quantity, name, key
// delete method -> simply uses originalTaskId to remove it from the DB
// put method -> uses originalTaskId to update the items/quantities (might be easier to delete -> create)
// post method -> used the data to create a task with the items/quantities (just create)

//ALTER TABLES:
//other changes in the DB: (should break the seed);
//bossMats -> rarity (default 4)                    OK
//localSpecialty -> rarity (default 1)              OK
//weeklyBossMats -> rarity (default 5)              OK

//ALTER TABLES:
//remove image field from: (assets are not loaded inside the DB, key is used to access in the front end)
//EnemyMats                                         OK
//BossMats                                          OK
//DungeonMats                                       OK
//WeeklyBossMats                                    OK
//LocalSpecialty                                    OK
//Characters (imageFace && imageSplashArt)          OK
//CharacterAscensions                               OK
//CharacterTalents                                  OK
//CharacterConstellations                           OK
//Dungeons                                          OK

//DELETE TABLES:
//Themes        (assets are in the front, there's no need to send it)   OK
//ThemeHexes    (assets are in the front, there's no need to send it)   OK
//UserCharTalents   (Unused table)                  OK
//UserTasks         (Unused table)                  OK

//ALTER TABLES:
//Tasks: add userId, image                                      OK
//TaskInfo: remove weaponMat, there's no data for it yet        OK

//FIX SEED AFTER THE CHANGES

//CREATE ROUTE FOR ITEMS    (will be useful for the backpack route in the front too)
//(/items/dungeonmats)
//(/items/bossmats)
//(/items/enemymats)
//(/items/localspecialty)
//(/items/weeklybossmats)

//FIX TESTS BELLOW

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
    it('should return status 200 and user tasks (empty)', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.get('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ message: 'empty list', tasks: [] });
    });

    it('should return status 200 and user tasks (filled)', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.get('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ message: null, tasks: [] });
    });
    //
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

      //
    });

    it('should return status 400 when something is invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        body: false,
      };

      const response = await server.post('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('When everything is valid', () => {
      //
      it('should return status 201 when everything is fine', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);

        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = {
          body: false,
        };

        const response = await server.post('/tasks/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        //
      });
      //
    });

    //
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

      //
    });

    it('should return status 400 when doing something invalid', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        body: false,
      };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when using invalid values', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        body: false,
      };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 404 when user task does not exist', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        body: false,
      };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    describe('When everything is valid', () => {
      //
      it('should return status 200 when everything is fine', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);
        const character = await createCharacterWithDetails();
        const userCharacter = await createUserCharacter(character, newUser.id);

        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = {
          userCharacterId: userCharacter.id,
          characterId: userCharacter.characterId,
          level: 80, //parameter that should be changed (original value: 90)
          friendship: 10,
          talents: {
            normal: 10,
            skill: 10,
            burst: 10,
          },
          constellations: 5,
        };

        const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.OK);
        //
      });
      //
    });

    //
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

      //
    });

    describe('When everything is valid', () => {
      //
      it('should return status 200 when everything is fine and delete the task', async () => {
        //CODE HERE
        //
      });
      //
    });

    //
  });
});
