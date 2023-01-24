import { authService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function SignUp(req: Request, res: Response) {
  try {
    const user = await authService.handleSignUp(req.body);

    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error.name === 'InvalidCredentials') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    if (error.name === 'EmailInUse') {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function Login(req: Request, res: Response) {
  try {
    const token = await authService.handleLogin(req.body);

    return res.status(httpStatus.OK).send({ token: token });
  } catch (error) {
    if (error.name === 'UserNotFound') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'InvalidCredentials') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function LoginGithub(req: Request, res: Response) {
  console.log('LoginGithub');
  try {
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function LoginGoogle(req: Request, res: Response) {
  console.log('LoginGoogle');
  try {
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
