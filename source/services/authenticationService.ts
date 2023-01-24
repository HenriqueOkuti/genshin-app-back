import { emailInUseError, invalidCredentialsError } from '@/errors';
import { authRepository } from '@/repositories';
import bcrypt from 'bcrypt';

type signUpBodyType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function handleSignUp({ name, email, password, confirmPassword }: signUpBodyType) {
  if (password !== confirmPassword) {
    //throw bad request
    throw invalidCredentialsError();
  }

  //find email
  const registeredEmail = await authRepository.findEmail(email);

  if (registeredEmail) {
    throw emailInUseError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authRepository.createUser(email, hashedPassword, name);
  return newUser;
}

const authService = {
  handleSignUp,
};

export { authService };
