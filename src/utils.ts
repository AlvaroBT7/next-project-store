import {
  User,
  GetUserByIdParams,
  ValidateCredentialsParams,
  CreateUserFromLoginWindowDataParams,
  ValidateNewUserParams,
} from "./types";

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

export function getNextUserId(usersData: User[]): number {
  return usersData.sort((a, b) => b.id - a.id)[0].id + 1;
}

export function createUserFromLoginWindowData({
  inputName,
  inputSurname,
  inputEmail,
  inputPassword,
  newUserId,
}: CreateUserFromLoginWindowDataParams): User {
  return {
    id: newUserId,
    name: inputName,
    surname: inputSurname,
    access: {
      email: inputEmail,
      password: inputPassword,
    },
  };
}

export function validateNewUser({
  newUser,
  users,
}: ValidateNewUserParams): boolean[] {
  const nameError =
    users.find(
      (eachUser: User) =>
        [eachUser.name, eachUser.surname].includes(newUser.name) ||
        [eachUser.name, eachUser.surname].includes(newUser.surname)
    ) !== undefined;
  const emailError =
    users.find(
      (eachUser: User) => eachUser.access.email === newUser.access.email
    ) !== undefined;

  return [nameError, emailError];
}

export function countObjKeys(obj: {}): number {
  return Object.keys(obj).length;
}
