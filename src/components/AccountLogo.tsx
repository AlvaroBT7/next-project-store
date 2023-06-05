import { useContext, useState } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User } from "../types";
import SinginWindow from "./SinginWindow";
import AccountLogoCard from "./AccountLogoCard";
import { getUserById } from "../utils";
import styles from "../style/AccountLogo.module.css";

interface Props {
  userId: number | null;
}

const AccountLogo = ({ userId }: Props) => {
  const [showingUserInfo, setShowingUserInfo] = useState<boolean>(false);
  const { users, showingSinginWindow, setShowingSinginWindow } = useContext(
    UsersDataContext
  ) as {
    users: User[];
    showingSinginWindow: boolean;
    setShowingSinginWindow: (newValue: boolean) => void;
  };
  // conditioanl rendering
  if (userId === null) {
    const handleClick = () => setShowingSinginWindow(true);
    return (
      <>
        {showingSinginWindow ? (
          <SinginWindow handleClick={() => setShowingSinginWindow(false)} />
        ) : null}
        <button onClick={handleClick} className={styles.AccountLogo}>
          Log-In
        </button>
      </>
    );
  }
  if (users === null)
    return (
      <div>
        <span>fetching account...</span>
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
          handleMouseLeave={() => setShowingUserInfo(false)}
          userData={user}
        />
      ) : null}
      <button
        className={styles.AccountLogo}
        onClick={() => setShowingUserInfo(true)}
      >
        {user.name}
      </button>
    </>
  );
};

export default AccountLogo;
