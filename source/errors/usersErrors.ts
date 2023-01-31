function userNotFoundError() {
  return {
    name: 'UserNotFound',
    message: 'user not found',
  };
}

function wrongEmail() {
  return {
    name: 'WrongEmail',
    message: 'wrong email in the request',
  };
}

function unnecessaryOperation() {
  return {
    name: 'DidNotUpdate',
    message: 'user infos are the same',
  };
}

const usersErrors = {
  userNotFoundError,
  wrongEmail,
  unnecessaryOperation,
};

export { usersErrors };
