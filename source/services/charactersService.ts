import { usersErrors } from '@/errors';
import { charactersRepository, FixedCharacterType } from '@/repositories';

async function handleFetchCharacters(userId: number) {
  //search and return
  const characters = await charactersRepository.userCharacters(userId);

  const fixedCharacters: FixedCharacterType[] = [];

  for (let i = 0; i < characters.length; i++) {
    const fixedCharacter = await charactersRepository.fillUserCharacterDetails(userId, characters[i]);
    fixedCharacters.push(fixedCharacter);
  }

  return fixedCharacters;
}

const charactersService = {
  handleFetchCharacters,
};

export { charactersService };
