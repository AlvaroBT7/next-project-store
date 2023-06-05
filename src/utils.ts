import { User, GetUserByIdParams, ValidateCredentialsParams } from "./types";

export function getUserById({ userId, users }: GetUserByIdParams): User {
  let userToFind: User = users.find((eachUser) => {
    return eachUser.id === userId;
  }) as User;
  if (userToFind === undefined)
    throw new Error("Any user match with your current user account id");
  return userToFind;
}

export function validateCredentials({
  email,
  password,
  users,
}: ValidateCredentialsParams): User | undefined {
  let matchingUser: User | undefined = users.find((user: User) => {
    return user.access.email === email && user.access.password === password;
  });
  return matchingUser;
}
