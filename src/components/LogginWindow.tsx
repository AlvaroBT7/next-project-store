import {
  getNextUserId,
  createUserFromLoginWindowData,
  validateNewUser,
} from "../utils";
import { useContext, useState } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { User } from "../types";
import GenericButton from '../components/generic/GenericButton'
import { Cross } from "../components/svgs/index";
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

  const [authenticationError, setAuthenticationError] = useState<string | null>(
    null
  );
  const [loadingButtonAnimation, setLoadingButtonAnimation] =
    useState<boolean>(false);

  const handleCloseButtonClick = () => setShowingLoginWindow(false);
  const handleEnterButtonClick = async () => {
    try {
      await new Promise((resolve, reject) => {
        setLoadingButtonAnimation(true);
        setInterval(() => {
          if (users !== null) resolve(null);
        }, 100);
        setTimeout(() => {
          reject(
            "Something went wrong fetching the data. It seems to be stuck."
          );
        }, 3000);
      });
      const newUser = createUserFromLoginWindowData({
        inputName,
        inputSurname,
        inputEmail,
        inputPassword,
        newUserId: getNextUserId(users as User[]),
      });
      await new Promise((resolve, reject) => {
        const validationErrors = {
          name: 0,
          email: 1,
        };
        const errorMessages = [
          "The name or the surname you chose is already in use.",
          "There is already an account associated with that email.",
        ];

        const validation: boolean[] = validateNewUser({
          newUser,
          users,
        } as {
          newUser: User;
          users: User[];
        });
        if (validation[validationErrors["name"]])
          return reject(errorMessages[0]);
        if (validation[validationErrors["email"]])
          return reject(errorMessages[1]);

        resolve(null);
      });
      (users as User[]).push(newUser);
      setCurrentUserAccountId(newUser.id);
      setShowingLoginWindow(false);
    } catch (e: any) {
      setAuthenticationError(e.toString());
    } finally {
      setLoadingButtonAnimation(false);
    }
  };
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
        <div
          className={styles.closeWindowButton}
          onClick={handleCloseButtonClick}
        >
          <Cross />
        </div>
        <div className={styles.titleContainer}>
          <span>Log-In Window</span>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={({ target }) => {
              setAuthenticationError(null);
              setInputName(target.value);
            }}
            type="text"
            placeholder="What's your name?"
            value={inputName}
          />
          <input
            onChange={({ target }) => {
              setAuthenticationError(null);
              setInputSurname(target.value);
            }}
            type="text"
            placeholder="What's your surname?"
            value={inputSurname}
          />
          <input
            onChange={({ target }) => {
              setAuthenticationError(null);
              setInputEmail(target.value);
            }}
            type="email"
            placeholder="Any email here"
            value={inputEmail}
          />
          <input
            onChange={({ target }) => {
              setAuthenticationError(null);
              setInputPassword(target.value);
            }}
            type="password"
            placeholder="Your new password"
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
              width: '100%'
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
          <span onClick={handleChangeWindowButton}>Sign-In</span>
        </div>
      </div>
    </div>
  );
};

export default LoggingWindow;
