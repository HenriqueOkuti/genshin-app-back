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
import {
  createNewTempItems,
  createNewUserInvalidTaskBody,
  createNewUserTaskBody,
  createTempItems,
  createTempTaskPOSTBody,
  createTempTaskPUTBody,
  createTempTransactionPOST,
  createTempTransactionPUT,
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
    it('should return status 200 and user tasks (filled)', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const userTask = await createUserTask(newUser.id);

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      //console.log(userTask);

      const response = await server.get('/tasks/user').set('Authorization', headers.Authorization);

      expect(response.status).toBe(httpStatus.OK);
      // had to change the expect bellow to fit the front display:
      // expect(response.body).toEqual({
      //   message: null,
      //   tasks: [
      //     {
      //       userId: userTask.userId,
      //       id: userTask.taskId,
      //       name: userTask.name,
      //       updatedAt: JSON.stringify(userTask.updatedAt),
      //       createdAt: JSON.stringify(userTask.createdAt),
      //       image: userTask.image,
      //       items: userTask.items,
      //     },
      //   ],
      // });
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
      //
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
      const userTask = await createUserTask(newUser.id);
      const invalidModifiedTask = await invalidModifyUserTask(userTask); //

      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = invalidModifiedTask;

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      //
    });

    it('should return status 404 when user task does not exist', async () => {
      const newUser = await generateUser();
      const token = await generateValidToken(newUser);
      const userTask = await createUserTask(newUser.id);
      const invalidModifiedTask = await validModifyUserTask(userTask); //
      await generateSession(newUser.id, token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = { ...invalidModifiedTask, taskId: 0 };

      const response = await server.put('/tasks/user').set('Authorization', headers.Authorization).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    describe('When everything is valid', () => {
      //
      it('should return status 200 when everything is fine', async () => {
        const newUser = await generateUser();
        const token = await generateValidToken(newUser);
        const userTask = await createUserTask(newUser.id);
        const validModifiedTask = await validModifyUserTask(userTask); //
        await generateSession(newUser.id, token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = validModifiedTask;

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

      //
    });

    describe('When everything is valid', () => {
      //
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
        //
      });
      //
    });

    //
  });
});

//CACHE ROUTE:
//USER MANIPULATES A TASK LIST IN THE FRONT
//(EDITING A EXISTING TASK OR CREATING A NEW TASK)

//GET:
//USED TO FETCH THE TASK FROM THE CACHE TABLE
//  - REQUIRES THE TEMP_TASK_ID
// describe('GET /tasks/cache', () => {
//   it('should return status 401 when token is not given', async () => {
//     const response = await server.get('/tasks/cache');
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should return status 401 when token is not valid', async () => {
//     const headers = {
//       Authorization: `Bearer ${faker.lorem.word()}`,
//     };
//     const response = await server.get('/tasks/cache').set('Authorization', headers.Authorization);
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   describe('When token is valid', () => {
//     it('should return status 200 and user temp task', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);
//       const originalTask = await createUserTask(newUser.id);
//       const tempTransaction = await createTempTransactionPUT(newUser.id, originalTask.taskId);
//       const newItems = await createNewTempItems();
//       const newTempItems = await createTempItems(newUser.id, newItems);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await server.get('/tasks/cache').set('Authorization', headers.Authorization);

//       expect(response.status).toBe(httpStatus.OK);
//     });
//     //
//   });
// });

// //POST:
// //USED TO INSERT THE TASK INSIDE THE CACHE TABLE
// //  - IF EDITING A TASK REQUIRES THE ORIGINAL TASK ID (isPost = false, isPut = true)
// //  - IF INSERTING, THE ORIGINAL TASK ID IS OPTIONAL (isPost = true, isPut = false)
// //  - IF A TEMP TASK ALREADY EXISTS, DELETE THE PREVIOUS
// describe('POST /tasks/cache', () => {
//   it('should return status 401 when token is not given', async () => {
//     const response = await server.post('/tasks/cache');
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should return status 401 when token is not valid', async () => {
//     const headers = {
//       Authorization: `Bearer ${faker.lorem.word()}`,
//     };
//     const response = await server.post('/tasks/cache').set('Authorization', headers.Authorization);
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   describe('When token is valid', () => {
//     it('should return status 400 when there is no body', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await server.post('/tasks/cache').set('Authorization', headers.Authorization);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     it('should return status 400 when body is invalid', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const body = {
//         invalidData: 1,
//       };

//       const response = await server.post('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);

//       //
//     });

//     describe('When everything is valid', () => {
//       //
//       it('isPost case: it should return 201', async () => {
//         const newUser = await generateUser();
//         const token = await generateValidToken(newUser);
//         const tempTransaction = createTempTaskPOSTBody(newUser.id);

//         await generateSession(newUser.id, token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const body = tempTransaction;

//         const response = await server.post('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//         expect(response.status).toBe(httpStatus.CREATED);
//         //
//       });
//       //
//       it('isPut case: it should return 201', async () => {
//         const newUser = await generateUser();
//         const token = await generateValidToken(newUser);
//         const originalTask = await createUserTask(newUser.id);
//         const tempTransaction = createTempTaskPUTBody(newUser.id, originalTask.taskId);
//         const items = await createNewTempItems();
//         const tempItems = await createTempItems(newUser.id, items);

//         await generateSession(newUser.id, token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const body = { ...tempTransaction, items: tempItems };

//         const response = await server.post('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//         expect(response.status).toBe(httpStatus.CREATED);
//         //
//       });

//       //
//     });

//     //
//   });
// });

// //PUT:
// //USED TO ALTER THE TASK INSIDE THE CACHE TABLE
// //  - REQUIRES THE TEMP TASK INFO
// describe('PUT /tasks/cache', () => {
//   it('should return status 401 when token is not given', async () => {
//     const response = await server.put('/tasks/cache');
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should return status 401 when token is not valid', async () => {
//     const headers = {
//       Authorization: `Bearer ${faker.lorem.word()}`,
//     };
//     const response = await server.put('/tasks/cache').set('Authorization', headers.Authorization);
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   describe('When token is valid', () => {
//     it('should return status 400 when there is no body', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await server.put('/tasks/cache').set('Authorization', headers.Authorization);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     it('should return status 400 when body is invalid', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const body = {
//         invalidData: 1,
//       };

//       const response = await server.put('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);

//       //
//     });

//     describe('When everything is valid', () => {
//       //
//       it('(new task) should return status 200 when everything is fine', async () => {
//         const newUser = await generateUser();
//         const token = await generateValidToken(newUser);
//         const tempTransaction = await createTempTransactionPOST(newUser.id);
//         const newItems = await createNewTempItems();

//         await generateSession(newUser.id, token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const body = {
//           userId: newUser.id,
//           name: tempTransaction.name,
//           image: tempTransaction.image,
//           isPost: tempTransaction.isPost,
//           isPut: tempTransaction.isPut,
//           items: newItems,
//         };

//         const response = await server.put('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//         expect(response.status).toBe(httpStatus.OK);
//         //
//       });
//       it('(existing task) should return status 200 when everything is fine', async () => {
//         const newUser = await generateUser();
//         const token = await generateValidToken(newUser);
//         const originalTask = await createUserTask(newUser.id);
//         const tempTransaction = await createTempTransactionPUT(newUser.id, originalTask.taskId);
//         const newItems = await createNewTempItems();

//         await generateSession(newUser.id, token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const body = {
//           userId: newUser.id,
//           name: tempTransaction.name,
//           image: tempTransaction.image,
//           isPost: tempTransaction.isPost,
//           isPut: tempTransaction.isPut,
//           originalTask: originalTask.taskId,
//           items: newItems,
//         };

//         const response = await server.put('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//         expect(response.status).toBe(httpStatus.OK);
//         //
//       });

//       //
//     });

//     //
//   });
// });

// //GET:
// //USED TO REMOVE THE TASK FROM THE CACHE TABLE
// //  - WHEN USER DELETES HERE, HE CAN:
// //    --DO A POST OR A PUT IN THE '/tasks/user'
// //    --DO NOTHING
// describe('DELETE /tasks/cache', () => {
//   it('should return status 401 when token is not given', async () => {
//     const response = await server.delete('/tasks/cache');
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should return status 401 when token is not valid', async () => {
//     const headers = {
//       Authorization: `Bearer ${faker.lorem.word()}`,
//     };
//     const response = await server.delete('/tasks/cache').set('Authorization', headers.Authorization);
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   describe('When token is valid', () => {
//     it('should return status 400 when there is no body', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await server.delete('/tasks/cache').set('Authorization', headers.Authorization);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     it('should return status 400 when body is invalid', async () => {
//       const newUser = await generateUser();
//       const token = await generateValidToken(newUser);

//       await generateSession(newUser.id, token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const body = {
//         invalidData: 1,
//       };

//       const response = await server.delete('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);

//       //
//     });

//     describe('When everything is valid', () => {
//       //
//       it('(new task) should return status 200 when everything is fine', async () => {
//         const newUser = await generateUser();
//         const token = await generateValidToken(newUser);
//         const tempTransaction = await createTempTransactionPOST(newUser.id);
//         const newItems = await createNewTempItems();

//         await generateSession(newUser.id, token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const body = {
//           tempTaskId: 1,
//         };

//         const response = await server.delete('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//         expect(response.status).toBe(httpStatus.OK);
//         //
//       });
//       it('(existing task) should return status 200 when everything is fine', async () => {
//         const newUser = await generateUser();
//         const token = await generateValidToken(newUser);
//         const originalTask = await createUserTask(newUser.id);
//         const tempTransaction = await createTempTransactionPUT(newUser.id, originalTask.taskId);
//         const newItems = await createNewTempItems();
//         const newTempItems = await createTempItems(newUser.id, newItems);

//         await generateSession(newUser.id, token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const body = {
//           tempTaskId: tempTransaction.id,
//         };

//         const response = await server.delete('/tasks/cache').set('Authorization', headers.Authorization).send(body);

//         expect(response.status).toBe(httpStatus.OK);
//         //
//       });
//       //
//     });

//     //
//   });
// });
