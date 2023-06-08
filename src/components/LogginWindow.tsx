import {
  getNextUserId,
  createUserFromLoginWindowData,
  validateNewUser,
} from "../utils";
import { useContext, useState } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User, ValidateNewUserParams, ValidateNewUserReturn } from "../types";
import AuthenticationButton from "../components/AuthenticationButton";
import AuthenticationErrorMessages from "../components/AuthenticationErrorMessages";
import CloseWindowButton from "../components/CloseWindowButton";
import styles from "../style/LoginWindow.module.css";

const LoggingWindow = () => {
  const {
    users,
    setShowingSigninWindow,
    setShowingLoginWindow,
    setCurrentUserAccountId,
  } = useContext(UsersDataContext) as {
    users: User[] | null;
    setShowingSigninWindow: (newValue: boolean) => void;
    setShowingLoginWindow: (newValue: boolean) => void;
    setCurrentUserAccountId: (newValue: number) => void;
  };

  const [inputName, setInputName] = useState<string>("");
  const [inputSurname, setInputSurname] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const [authenticationErrors, setAuthenticationErrors] = useState<
    string[] | null
  >(null);
  const [loadingButtonAnimation, setLoadingButtonAnimation] =
    useState<boolean>(false);

  const handleAthenticationButtonClick = async () => {
    try {
      await new Promise((resolve, reject) => {
        setLoadingButtonAnimation(true);
        setInterval(() => {
          if (users !== null) resolve(null);
        }, 100);
        setTimeout(() => {
          reject([
            "Something went wrong fetching the data. It seems to be stuck.",
          ]);
        }, 3000);
      });
      const newUser: User = await new Promise((resolve, reject) => {
        const newUser = createUserFromLoginWindowData({
          inputName,
          inputSurname,
          inputEmail,
          inputPassword,
          newUserId: getNextUserId(users as User[]),
        });
        if (newUser === null)
          return reject(["You cannot skip fields when creating the account."]);
        resolve(newUser);
      });
      await new Promise((resolve, reject) => {
        const validation: ValidateNewUserReturn = validateNewUser({
          newUser,
          users,
        } as ValidateNewUserParams);
        if (validation.errors) return reject(validation.messages);
        resolve(null);
      });
      (users as User[]).push(newUser);
      setCurrentUserAccountId(newUser.id);
      setShowingLoginWindow(false);
    } catch (e: any) {
      setAuthenticationErrors(e);
    } finally {
      setLoadingButtonAnimation(false);
    }
  };
  const handleCloseWindowButtonClick = () => setShowingLoginWindow(false);
  const handleChangeWindowButton = () => {
    setShowingLoginWindow(false);
    setShowingSigninWindow(true);
  };
  return (
    <div className={styles.SinginWindowBG}>
      <div
        style={{
          animation: "show_window 0.3s ease",
        }}
        className={styles.SinginWindow}
      >
        <CloseWindowButton callback={handleCloseWindowButtonClick} />
        <div className={styles.titleContainer}>
          <span>Log-In Window</span>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={({ target }) => {
              setAuthenticationErrors(null);
              setInputName(target.value);
            }}
            type="text"
            placeholder="What's your name?"
            value={inputName}
          />
          <input
            onChange={({ target }) => {
              setAuthenticationErrors(null);
              setInputSurname(target.value);
            }}
            type="text"
            placeholder="What's your surname?"
            value={inputSurname}
          />
          <input
            onChange={({ target }) => {
              setAuthenticationErrors(null);
              setInputEmail(target.value);
            }}
            type="email"
            placeholder="Any email here"
            value={inputEmail}
          />
          <input
            onChange={({ target }) => {
              setAuthenticationErrors(null);
              setInputPassword(target.value);
            }}
            type="password"
            placeholder="Your new password"
            value={inputPassword}
          />
        </div>
        <AuthenticationErrorMessages errMessages={authenticationErrors} />
        <div className={styles.buttonContainer}>
          <AuthenticationButton
            states={{
              authenticationErrors,
              loadingButtonAnimation,
            }}
            callback={handleAthenticationButtonClick}
          />
        </div>
        <div className={styles.changeWindowButtonContainer}>
          <span onClick={handleChangeWindowButton}>Sign-In</span>
        </div>
      </div>
    </div>
  );
};

export default LoggingWindow;
