import { authService } from '@/services';
import axios from 'axios';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

export async function SignUp(req: Request, res: Response) {
  try {
    await authService.handleSignUp(req.body);

    return res.status(httpStatus.CREATED).send({ message: 'created with success' });
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
  const { githubCode } = req.body;
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

  const body = {
    code: githubCode,
    grant_type: 'authorization_URL',
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  try {
    const response = await axios.post(GITHUB_ACCESS_TOKEN_URL, body, {
      headers: {
        Accept: 'application/json',
      },
    });
    const token = response.data.access_token;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = userResponse.data;

    const email = userData.email ? userData.email : userData.id;
    const name = userData.login;

    const appToken = await authService.handleGithub(name, email);

    return res.status(httpStatus.OK).send({
      token: appToken,
    });
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
