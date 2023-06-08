import { Cross } from "../components/svgs/index";
import styles from "../style/CloseWindowButton.module.css";

interface Props {
  callback: () => void;
}

const CloseWindowButton = ({ callback }: Props) => {
  return (
    <div className={styles.closeWindowButton} onClick={callback}>
      <Cross />
    </div>
  );
};

export default CloseWindowButton;
