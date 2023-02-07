import { usersErrors } from '@/errors';
import { usersRepository } from '@/repositories';

async function handleFetchUserInfo(userId: number) {
  const userInfo = await usersRepository.findUserInfo(userId);

  if (!userInfo) {
    throw usersErrors.userNotFoundError();
  }

  return { id: userInfo.id, name: userInfo.name, email: userInfo.email, image: userInfo.image };
}

async function handleUpdateUserInfo(userId: number, newInfo: newInfoType) {
  const userDB = await usersRepository.findUserInfoViaEmail(newInfo.email);

  if (userDB.id !== userId) {
    throw usersErrors.wrongEmail();
  }

  if (userDB.name === newInfo.name && userDB.image === newInfo.image) {
    throw usersErrors.unnecessaryOperation();
  }

  const newUserInfo = await usersRepository.updateUserInfo(userId, newInfo);

  return {
    id: newUserInfo.id,
    name: newUserInfo.name,
    image: newUserInfo.image,
  };
}

export type newInfoType = {
  name: string;
  image: string;
  email: string;
};

const usersService = {
  handleFetchUserInfo,
  handleUpdateUserInfo,
};

export { usersService };
