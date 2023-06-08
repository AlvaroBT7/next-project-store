export interface User {
  id: number;
  name: string;
  surname: string;
  access: {
    email: string;
    password: string;
  };
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface GetUserByIdParams {
  userId: number;
  users: User[];
}

export interface ValidateCredentialsParams {
  email: string;
  password: string;
  users: User[];
}

export interface CreateUserFromLoginWindowDataParams {
  inputName: string;
  inputSurname: string;
  inputEmail: string;
  inputPassword: string;
  newUserId: number;
}

export interface ValidateNewUserParams {
  newUser: User;
  users: User[];
}

export interface ValidateNewUserReturn {
  errors: number | null;
  messages: string[];
}
