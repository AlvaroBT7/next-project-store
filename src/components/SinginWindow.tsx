import { useState, useContext } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User, ValidateCredentialsParams } from "../types";
import GenericButton from "../components/generic/GenericButton";
import { Cross } from "./svgs/index";
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
  const [authenticationError, setAuthenticationError] = useState<string | null>(
    null
  );
  const [loadingButtonAnimation, setLoadingButtonAnimation] =
    useState<boolean>(false);

  // working functionss
  const handleEnterButtonClick = () =>
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
          return setAuthenticationError(
            "The email or the password are not correct."
          );
        setCurrentUserAccountId(matchingUser.id);
        setShowingSigninWindow(false);
      })
      .catch((err: string) => setAuthenticationError(err))
      .finally(() => setLoadingButtonAnimation(false));
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
        <div
          className={styles.closeWindowButton}
          onClick={() => setShowingSigninWindow(false)}
        >
          <Cross />
        </div>
        <div className={styles.titleContainer}>
          <span>Sign-In Window</span>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={({ target }) => {
              setInputEmail(target.value);
              setAuthenticationError(null);
            }}
            type="email"
            placeholder="Enter email"
            value={inputEmail}
          />
          <input
            onChange={({ target }) => {
              setInputPassword(target.value);
              setAuthenticationError(null);
            }}
            type="password"
            placeholder="Enter password"
            value={inputPassword}
          />
        </div>
        {authenticationError ? (
          <div className={styles.warnContainer}>
            <span>{authenticationError}</span>
          </div>
        ) : null}
        <div className={styles.buttonContainer}>
          <GenericButton
            style={{
              animation: `${
                authenticationError ? "error_button_shake 0.2s ease" : ""
              }`,
              backgroundColor: `${authenticationError ? "#ce0927" : ""}`,
              width: "100%",
            }}
            callback={handleEnterButtonClick}
          >
            {loadingButtonAnimation ? (
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "100em",
                  borderBottom: "5px solid #fff",
                  animation: "spin 0.3s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                }}
              ></div>
            ) : (
              "Enter"
            )}
          </GenericButton>
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
