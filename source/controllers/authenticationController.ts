import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function SignUp(req: Request, res: Response) {
  try {
    console.log('try');
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function Login(req: Request, res: Response) {
  try {
    console.log('try');
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function LoginGithub(req: Request, res: Response) {
  try {
    console.log('try');
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function LoginGoogle(req: Request, res: Response) {
  try {
    console.log('try');
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
