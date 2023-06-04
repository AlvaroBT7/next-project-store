import { User } from "./types";

interface GetUserByIdParams {
  userId: number;
  usersData: User[];
}

export function getUserById({ userId, usersData }: GetUserByIdParams): User {
  let userToFind: User = usersData.find((eachUser) => {
    return eachUser.id === userId;
  }) as User;
  if (userToFind === undefined)
    throw new Error("Any user match with your current user account id");
  return userToFind;
}
