import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/signup').post('/login').post('github').post('google');
