"use client";
import React, { useState, useEffect, createContext } from "react";
import { User } from "../types";
import usersData from "../data/users.json";

export const UsersDataContext = createContext<User[] | null>(null);

const UsersDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => setUsers(usersData as User[]), []);
  return (
    <UsersDataContext.Provider value={users}>
      {children}
    </UsersDataContext.Provider>
  );
};

export default UsersDataProvider;
