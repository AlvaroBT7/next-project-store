import { ReactNode } from "react";
import styles from "../../style/GenericButton.module.css";

interface Props {
  children: string | ReactNode;
  style?: {};
  callback: () => void;
  type?: 'blue' | 'green' | 'red'
}

const GenericButton = ({ children, style, callback, type }: Props) => {
  return (
    <button className={type ? styles[`GenericButton-${type}`] : styles['GenericButton-blue']} style={style} onClick={callback}>
      {children}
    </button>
  );
};

export default GenericButton;
