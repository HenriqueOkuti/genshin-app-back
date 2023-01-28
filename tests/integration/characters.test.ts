import app, { init } from '../../source/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateSession, generateUser, generateValidToken } from '../helpers';
import { createCharacter, createCharacterWithDetails, createUserCharacter } from '../factories/characters.factory';

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

describe('GET /characters/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.get('/characters/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.get('/characters/user').set('Authorization', headers.Authorization);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 200 and user characters (empty)', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.get('/characters/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ message: 'empty list', characters: [] });
    });

    it('should return status 200 and user characters (filled)', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacter();
      const userCharacter = await createUserCharacter(character, newUser.id);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await server.get('/characters/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ message: null, characters: [userCharacter] });
    });
    //
  });
});

describe('POST /characters/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.post('/characters/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.post('/characters/user').set('Authorization', headers.Authorization);
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

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization);

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

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);

      //
    });

    it('should return status 400 when passing invalid constellation inside body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        characterId: character.id,
        level: 90,
        friendship: 10,
        talents: {
          normal: 10,
          skill: 10,
          burst: 10,
        },
        constellations: 7, //invalid parameter
      };

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid talent level inside body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        characterId: character.id,
        level: 90,
        friendship: 10,
        talents: {
          normal: 10,
          skill: 15, //invalid parameter
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid friendship level inside body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        characterId: character.id,
        level: 90,
        friendship: 15, //invalid parameter
        talents: {
          normal: 10,
          skill: 10,
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid level inside body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        characterId: character.id,
        level: 120, //invalid parameter
        friendship: 10,
        talents: {
          normal: 10,
          skill: 10,
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid combos inside body', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        characterId: character.id,
        level: 90,
        friendship: 10,
        talents: {
          normal: 10,
          skill: 13,
          burst: 13,
        },
        constellations: 0, //generates invalid talents -> max allowed is 10 for skill/burst
      };

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when character does not exist', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        characterId: 0,
        level: 1,
        friendship: 1,
        talents: {
          normal: 1,
          skill: 1,
          burst: 1,
        },
        constellations: 0,
      };

      const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('When everything is valid', () => {
      //
      it('should return status 201 when everything is fine', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);
        const character = await createCharacterWithDetails();

        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = {
          characterId: character.id,
          level: 90,
          friendship: 10,
          talents: {
            normal: 10,
            skill: 13,
            burst: 13,
          },
          constellations: 6,
        };

        const response = await server.post('/characters/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        //
      });
      //
    });

    //
  });
});

describe('PUT /characters/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.put('/characters/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.put('/characters/user').set('Authorization', headers.Authorization);
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

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization);

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

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);

      //
    });

    it('should return status 400 when passing invalid constellation inside body', async () => {
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
        constellations: 7, //invalid parameter
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid talent level inside body', async () => {
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
          skill: 15, //invalid parameter
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid friendship level inside body', async () => {
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
        friendship: 15, //invalid parameter
        talents: {
          normal: 10,
          skill: 10,
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid level inside body', async () => {
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
        level: 120, //invalid parameter
        friendship: 10,
        talents: {
          normal: 10,
          skill: 10,
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when passing invalid combos inside body', async () => {
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
          skill: 13,
          burst: 13,
        },
        constellations: 0, //generates invalid talents -> max allowed is 10 for skill/burst
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 400 when character does not exist', async () => {
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
        characterId: 0,
        level: 80, //parameter that should be changed (original value: 90)
        friendship: 10,
        talents: {
          normal: 10,
          skill: 10,
          burst: 10,
        },
        constellations: 5,
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return status 400 when user character does not exist', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();
      const userCharacter = await createUserCharacter(character, newUser.id);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        userCharacterId: 0,
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

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('When everything is valid', () => {
      //
      it('should return status 201 when everything is fine', async () => {
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

        const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.OK);
        //
      });
      //
    });

    //
  });
});

describe('DELETE /characters/user', () => {
  it('should return status 401 when token is not given', async () => {
    const response = await server.delete('/characters/user');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return status 401 when token is not valid', async () => {
    const headers = {
      Authorization: `Bearer ${faker.lorem.word()}`,
    };
    const response = await server.delete('/characters/user').set('Authorization', headers.Authorization);
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

      const response = await server.delete('/characters/user').set('Authorization', headers.Authorization);

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

      const response = await server.delete('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);

      //
    });

    it('should return status 400 when user character does not exist', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const character = await createCharacterWithDetails();
      const userCharacter = await createUserCharacter(character, newUser.id);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        userCharacterId: 0,
      };

      const response = await server.put('/characters/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('When everything is valid', () => {
      //
      it('should return status 200 when everything is fine and delete the character', async () => {
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
        };

        const response = await server.delete('/characters/user').set('Authorization', headers.Authorization).send(body);

        expect(response.status).toBe(httpStatus.OK);
        //
      });
      //
    });

    //
  });
});
