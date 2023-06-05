import { useState, useContext } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User, ValidateCredentialsParams } from "../types";
import { Cross } from "./svgs/index";
import { validateCredentials } from "../utils";
import styles from "../style/SigninWindow.module.css";

interface Props {
  handleClick: () => void;
}

const SinginWindow = ({ handleClick }: Props) => {
  const { users, setCurrentUserAccountId } = useContext(UsersDataContext) as {
    users: User[] | null;
    setCurrentUserAccountId: (newValue: number) => void;
  };
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleButtonClick = () => {
    new Promise((resolve, reject) => {
      setInterval(() => {
        if (users !== null) resolve(users);
      }, 100);
      setTimeout(() => {
        reject("Something went wrong, it seems to be stuck.");
      }, 3000);
    })
      .then((data) => {
        const matchingUser: User | undefined = validateCredentials({
          email: inputEmail,
          password: inputPassword,
          users,
        } as ValidateCredentialsParams);
        if (!matchingUser)
          return window.alert("The email or the password does not match");
        setCurrentUserAccountId(matchingUser.id);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.SinginWindowBG}>
      <div className={styles.SinginWindow}>
        <div className={styles.closeWindowButton} onClick={handleClick}>
          <Cross />
        </div>
        <div className={styles.titleContainer}>
          <span>Sing-In Window</span>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={({ target }) => setInputEmail(target.value)}
            type="email"
            placeholder="Enter email"
            value={inputEmail}
          />
          <input
            onChange={({ target }) => setInputPassword(target.value)}
            type="password"
            placeholder="Enter password"
            value={inputPassword}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleButtonClick}>Enter</button>
        </div>
        <div className={styles.loginSpan}>Log-In</div>
      </div>
    </div>
  );
};

export default SinginWindow;
