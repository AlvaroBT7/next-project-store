"use client";
import { useContext, useState } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User } from "../types";
import AccountLogoCard from "./AccountLogoCard";
import GenericButton from "./generic/GenericButton";
import { getUserById } from "../utils";
import styles from "../style/AccountLogo.module.css";

interface Props {
  userId: number | null;
}

const AccountLogo = ({ userId }: Props) => {
  const [showingUserInfo, setShowingUserInfo] = useState<boolean>(false);
  const { users, setShowingSigninWindow, setCurrentUserAccountId } = useContext(
    UsersDataContext
  ) as {
    users: User[];
    setCurrentUserAccountId: (newValue: number | null) => void;
    setShowingSigninWindow: (newValue: boolean) => void;
  };
  // conditioanl rendering
  if (userId === null) {
    const handleClick = () => setShowingSigninWindow(true);
    return (
      <>
        <GenericButton
          style={{
            animation: "logout 0.2s ease",
          }}
          callback={handleClick}
        >
          Log-In
        </GenericButton>
      </>
    );
  }
  if (users === null)
    return (
      <div>
        <span>loading data...</span>
      </div>
    );
  // finds the user by id prop
  const user: User = getUserById({
    userId,
    users,
  } as { userId: number; users: User[] });
  return (
    <>
      {showingUserInfo ? (
        <AccountLogoCard
          handleCloseButtonCardClick={() => setShowingUserInfo(false)}
          handleSingoutButtonCardClick={() => {
            setCurrentUserAccountId(null);
            setShowingUserInfo(false);
          }}
          userData={user}
        />
      ) : null}
      <GenericButton
        callback={() => setShowingUserInfo(true)}
        style={{
          animation: "logout 0.2s ease",
        }}
        type='green'
      >
        {user.name}
      </GenericButton>
    </>
  );
};

export default AccountLogo;
