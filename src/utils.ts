import {
  User,
  GetUserByIdParams,
  ValidateCredentialsParams,
  CreateUserFromLoginWindowDataParams,
  ValidateNewUserParams,
  ValidateNewUserReturn,
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
    name: inputName.trim(),
    surname: inputSurname.trim(),
    access: {
      email: inputEmail.trim(),
      password: inputPassword.trim(),
    },
  };
}

export function validateNewUser({
  newUser,
  users,
}: ValidateNewUserParams): ValidateNewUserReturn {
  const errors = {
    emptyFields: {
      errMessage: "You must fill in all the fields of the form.",
      happens: [
        newUser.name,
        newUser.surname,
        newUser.access.email,
        newUser.access.password,
      ].includes(""),
    },
    name: {
      errMessage: "The name or the surname you chose are already in use.",
      happens:
        users.find(
          (eachUser: User) =>
            eachUser.name === newUser.name ||
            eachUser.surname === newUser.surname
        ) !== undefined,
    },
    email: {
      errMessage: "There is already an account associated with that email.",
      happens:
        users.find(
          (eachUser: User) => eachUser.access.email === newUser.access.email
        ) !== undefined,
    },
  };
  const errorMessagesArr: string[] = Object.entries(errors)
    .filter((eachError) => eachError[1].happens)
    .map((eachError) => eachError[1].errMessage);

  return {
    errors: errorMessagesArr.length > 0 ? errorMessagesArr.length : null,
    messages: errorMessagesArr,
  };
}

export function countObjKeys(obj: {}): number {
  return Object.keys(obj).length;
}
