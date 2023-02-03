function NotFoundError() {
  return {
    name: 'NotFoundError',
    message: 'task not found',
  };
}

function ConflictError() {
  return {
    name: 'ConflictError',
    message: 'task does not belong to user',
  };
}

const tasksErrors = {
  NotFoundError,
  ConflictError,
};

export { tasksErrors };
