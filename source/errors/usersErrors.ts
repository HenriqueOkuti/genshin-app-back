function userNotFoundError() {
  return {
    name: 'UserNotFound',
    message: 'user not found',
  };
}

const usersErrors = {
  userNotFoundError,
};

export { usersErrors };
