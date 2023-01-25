import { usersErrors } from '@/errors';
import { usersRepository } from '@/repositories';

async function handleFetchUserInfo(userId: number) {
  //search and return
  const userInfo = await usersRepository.findUserInfo(userId);

  if (!userInfo) {
    throw usersErrors.userNotFoundError();
  }

  return { id: userInfo.id, name: userInfo.name, email: userInfo.email, image: userInfo.image };
}

const usersService = {
  handleFetchUserInfo,
};

export { usersService };
