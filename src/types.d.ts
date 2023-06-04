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
  price: number
}