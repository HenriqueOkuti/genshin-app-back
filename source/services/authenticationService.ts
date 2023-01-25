import { emailInUseError, invalidCredentialsError, userNotFoundError } from '@/errors';
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
    throw invalidCredentialsError();
  }

  const registeredEmail = await authRepository.findEmail(email);

  if (registeredEmail) {
    throw emailInUseError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authRepository.createUser(email, hashedPassword, name);
  return newUser;
}

async function handleLogin({ email, password }: signUpBodyType) {
  const userInfo = await authRepository.findEmail(email);
  if (!userInfo) {
    throw userNotFoundError();
  }
  const validPassword = await bcrypt.compare(password, userInfo.password);
  if (!validPassword) {
    throw invalidCredentialsError();
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
};

export { authService };
