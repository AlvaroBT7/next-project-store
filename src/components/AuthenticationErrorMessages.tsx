import styles from "../style/AuthenticationErrorMessages.module.css";

interface Props {
  errMessages: string[] | null;
}

const AuthenticationErrorMessages = ({ errMessages }: Props) => {
  if (errMessages === null) return null;
  return (
    <>
      <div className={styles.AuthenticationErrorMessages}>
        {errMessages.length > 0 ? (
          <div className={styles.AuthenticationErrorMessagesCountContainer}>
            <span className={styles.AuthenticationErrorMessagesCount}>{`${
              errMessages.length
            } Problem${errMessages.length > 1 ? "s" : ""}:`}</span>
          </div>
        ) : null}
        {errMessages.map((eachErrMessage, index) => {
          return (
            <span className={styles.AuthenticationErrorMessage}>
              {eachErrMessage}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default AuthenticationErrorMessages;
