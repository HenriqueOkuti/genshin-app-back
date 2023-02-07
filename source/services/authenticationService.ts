import { authErrors } from '@/errors';
import { authRepository } from '@/repositories';
import bcrypt from 'bcrypt';

type signUpBodyType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

async function handleSignUp({ name, email, password, confirmPassword }: signUpBodyType) {
  if (password !== confirmPassword) {
    throw authErrors.invalidCredentialsError();
  }

  const registeredEmail = await authRepository.findEmail(email);

  if (registeredEmail) {
    throw authErrors.emailInUseError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authRepository.createUser(email, hashedPassword, name);
  return newUser;
}

async function handleLogin({ email, password }: signUpBodyType) {
  const userInfo = await authRepository.findEmail(email);
  if (!userInfo) {
    throw authErrors.userNotFoundError();
  }
  const validPassword = await bcrypt.compare(password, userInfo.password);
  if (!validPassword) {
    throw authErrors.invalidCredentialsError();
  }
  const session = await authRepository.newSession(userInfo.id);
  return session.token;
}

async function handleGithub(name: string, email: string) {
  const userInfo = await authRepository.findEmail(email);
  if (!userInfo) {
    const randomPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const newUser = await authRepository.createUser(email, hashedPassword, name);
    const session = await authRepository.newSession(newUser.id);
    return session.token;
  } else {
    const session = await authRepository.newSession(userInfo.id);
    return session.token;
  }
}

export type googleData = {
  name: string;
  email: string;
  image: string;
};

async function handleGoogle(userData: googleData) {
  const userInfo = await authRepository.findEmail(userData.email);
  if (userInfo) {
    const session = await authRepository.newSession(userInfo.id);
    return session.token;
  } else {
    const randomPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const newUser = await authRepository.createUser(userData.email, hashedPassword, userData.name);
    const session = await authRepository.newSession(newUser.id);
    return session.token;
  }
}

function generatePassword() {
  let password = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 64; i++) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return password;
}

const authService = {
  handleSignUp,
  handleLogin,
  handleGithub,
  handleGoogle,
};

export { authService };
