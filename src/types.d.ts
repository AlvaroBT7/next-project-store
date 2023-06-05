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
