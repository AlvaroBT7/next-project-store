import { useState, useContext } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User, ValidateCredentialsParams } from "../types";
import AuthenticationButton from "../components/AuthenticationButton";
import CloseWindowButton from "../components/CloseWindowButton";
import AuthenticationErrorMessages from "../components/AuthenticationErrorMessages";
import { validateCredentials } from "../utils";
import styles from "../style/SigninWindow.module.css";

const SinginWindow = () => {
  // main context stats and setStates
  const {
    users,
    setCurrentUserAccountId,
    setShowingSigninWindow,
    setShowingLoginWindow,
  } = useContext(UsersDataContext) as {
    users: User[] | null;
    setCurrentUserAccountId: (newValue: number) => void;
    setShowingSigninWindow: (newValue: boolean) => void;
    setShowingLoginWindow: (newValue: boolean) => void;
  };
  // componets states
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [authenticationErrors, setAuthenticationErrors] = useState<
    string[] | null
  >(null);
  const [loadingButtonAnimation, setLoadingButtonAnimation] =
    useState<boolean>(false);

  // working functionss
  const handleAthenticationButtonClick = () =>
    new Promise((resolve, reject) => {
      setLoadingButtonAnimation(true);
      setInterval(() => {
        if (users !== null) resolve(null);
      }, 100);
      setTimeout(() => {
        reject("Something went wrong fetching the data. It seems to be stuck.");
      }, 3000);
    })
      .then(() => {
        const matchingUser: User | undefined = validateCredentials({
          email: inputEmail,
          password: inputPassword,
          users,
        } as ValidateCredentialsParams);
        if (!matchingUser)
          return setAuthenticationErrors([
            "The email or the password are not correct.",
          ]);
        setCurrentUserAccountId(matchingUser.id);
        setShowingSigninWindow(false);
      })
      .catch((err: string) => setAuthenticationErrors([err]))
      .finally(() => setLoadingButtonAnimation(false));

  const handleCloseWindowButtonClick = () => setShowingSigninWindow(false);
  const handleChangeWindowButton = () => {
    setShowingSigninWindow(false);
    setShowingLoginWindow(true);
  };

  return (
    <div className={styles.SinginWindowBG}>
      <div
        className={styles.SinginWindow}
        style={{
          animation: "show_window 0.3s ease",
        }}
      >
        <CloseWindowButton callback={handleCloseWindowButtonClick} />
        <div className={styles.titleContainer}>
          <span>Sign-In Window</span>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={({ target }) => {
              setInputEmail(target.value);
              setAuthenticationErrors(null);
            }}
            type="email"
            placeholder="Enter email"
            value={inputEmail}
          />
          <input
            onChange={({ target }) => {
              setInputPassword(target.value);
              setAuthenticationErrors(null);
            }}
            type="password"
            placeholder="Enter password"
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
          <span
            className={styles.changeWindowButton}
            onClick={handleChangeWindowButton}
          >
            Log-In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SinginWindow;
