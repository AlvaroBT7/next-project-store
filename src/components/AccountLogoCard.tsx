import { User } from "../types";
import styles from "../style/AccountLogoCard.module.css";

interface Props {
  userData: User;
  handleMouseLeave: () => void;
}

const AccountUserInfo = ({ userData, handleMouseLeave }: Props) => {
  return (
    <div className={styles.AccountLogoCard} onMouseLeave={handleMouseLeave}>
      <span className={styles.CardName}>{userData.name}</span>
      <span className={styles.CardSurname}>{userData.surname}</span>
      <span className={styles.CardEmail}>{userData.access.email}</span>
    </div>
  );
};

export default AccountUserInfo;
