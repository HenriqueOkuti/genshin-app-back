import { usersRepository } from '@/repositories';

async function handleFetchUserInfo(userId: number) {
  //search and return
  const userInfo = await usersRepository.findUserInfo(userId);

  console.log(userInfo);

  if (!userInfo) {
    //throw Internal Server Error
  }

  return { id: userInfo.id, name: userInfo.name, email: userInfo.email, image: userInfo.image };
}

const usersService = {
  handleFetchUserInfo,
};

export { usersService };
