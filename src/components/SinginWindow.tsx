import { Cross } from "./svgs";
import styles from "../style/SigninWindow.module.css";

interface Props {
  handleClick: () => void;
}

const SinginWindow = ({ handleClick }: Props) => {
  return (
    <div className={styles.SinginWindowBG}>
      <div className={styles.SinginWindow}>
        <div className={styles.closeWindowButton} onClick={handleClick}>
          <Cross />
        </div>
        <div className={styles.inputContainer}></div>
        <div className={styles.buttonContainer}></div>
      </div>
    </div>
  );
};

export default SinginWindow;
