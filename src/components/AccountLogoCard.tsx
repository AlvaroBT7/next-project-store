import GenericButton from "../components/generic/GenericButton";
import { Cross } from "../components/svgs/index";
import { User } from "../types";
import styles from "../style/AccountLogoCard.module.css";

interface Props {
  userData: User;
  handleCloseButtonCardClick: () => void;
  handleSingoutButtonCardClick: () => void;
}

const AccountUserInfo = ({
  userData,
  handleCloseButtonCardClick,
  handleSingoutButtonCardClick,
}: Props) => {
  return (
    <div
      className={styles.AccountLogoCard}
      style={{
        animation: "show_window 0.1s ease",
      }}
    >
      <div
        className={styles.closeButtonContainer}
        onClick={handleCloseButtonCardClick}
      >
        <Cross />
      </div>
      <span className={styles.cardCredentials}>
        {userData.name} {userData.surname}
      </span>
      <span className={styles.cardEmail}>{userData.access.email}</span>
      <div className={styles.singoutButtonContainer}>
        <GenericButton callback={handleSingoutButtonCardClick}>
          Sign-Out
        </GenericButton>
      </div>
    </div>
  );
};

export default AccountUserInfo;
