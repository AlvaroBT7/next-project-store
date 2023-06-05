"use client";
import React, { useState, useEffect, createContext } from "react";
import { User } from "../types";
import usersData from "../data/users.json";

interface ValueProp {
  users: User[] | null;
  currentUserAccountId: number | null;
  setCurrentUserAccountId: (newValue: number) => void;
  showingSinginWindow: boolean;
  setShowingSinginWindow: (newValue: boolean) => void;
}

export const UsersDataContext = createContext<ValueProp | null>(null);

const UsersDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentUserAccountId, setCurrentUserAccountId] = useState<
    number | null
  >(null);
  const [showingSinginWindow, setShowingSinginWindow] =
    useState<boolean>(false);

  useEffect(() => setUsers(usersData as User[]), []);
  return (
    <UsersDataContext.Provider
      value={{
        users,
        currentUserAccountId,
        setCurrentUserAccountId,
        showingSinginWindow,
        setShowingSinginWindow,
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};

export default UsersDataProvider;
