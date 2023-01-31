function characterNotFoundError() {
  return {
    name: 'CharacterNotFound',
    message: 'character not found',
  };
}

function characterAlreadyCreatedError() {
  return {
    name: 'CharacterConflict',
    message: 'user already inserted character',
  };
}

function notFoundError() {
  return {
    name: 'NotFoundError',
    message: 'info not found',
  };
}

const charactersErrors = {
  characterNotFoundError,
  characterAlreadyCreatedError,
  notFoundError,
};

export { charactersErrors };
