export function invalidCredentialsError() {
  return {
    name: 'InvalidCredentials',
    message: 'email or password are incorrect',
  };
}

export function emailInUseError() {
  return {
    name: 'EmailInUse',
    message: 'email already in use',
  };
}

export function userNotFoundError() {
  return {
    name: 'UserNotFound',
    message: 'user not found',
  };
}
