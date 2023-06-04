import { useContext, useState } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User } from "../types";
import SinginWindow from "./SinginWindow";
import { getUserById } from "../utils";
import styles from "../style/AccountLogo.module.css";

interface Props {
  userId: number | null;
}

const AccountLogo = ({ userId }: Props) => {
  const [showingSinginWindow, setShowingSinginWindow] =
    useState<boolean>(false);
  const [showingUserInfo, setShowingUserInfo] = useState<boolean>(false);
  const usersData = useContext(UsersDataContext);
  // conditioanl rendering
  if (userId === null) {
    const handleClick = () => setShowingSinginWindow(true);
    return (
      <>
        {showingSinginWindow ? (
          <SinginWindow
            handleClick={() => setShowingSinginWindow(false)}
          />
        ) : null}
        <button onClick={handleClick} className={styles.AccountLogo}>
          Log-In
        </button>
      </>
    );
  }
  if (usersData === null)
    return (
      <div>
        <span>fetching account...</span>
      </div>
    );
  // finds the user by id prop
  const user: User = getUserById({
    userId,
    usersData,
  } as { userId: number; usersData: User[] });
  return (
    <>
      {showingUserInfo ? (
        <div
          className={styles.AccountLogoCard}
          onMouseLeave={() => setShowingUserInfo(false)}
        >
          <span className={styles.CardName}>{user.name}</span>
          <span className={styles.CardSurname}>{user.surname}</span>
          <span className={styles.CardEmail}>{user.access.email}</span>
        </div>
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
