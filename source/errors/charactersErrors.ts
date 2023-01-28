export function characterNotFoundError() {
  return {
    name: 'CharacterNotFound',
    message: 'character not found',
  };
}

export function characterAlreadyCreatedError() {
  return {
    name: 'CharacterConflict',
    message: 'user already inserted character',
  };
}

const charactersErrors = {
  characterNotFoundError,
  characterAlreadyCreatedError,
};

export { charactersErrors };
