import { Item as ItemInterface } from "../types";
import styles from "../style/Item.module.css";

const Item = ({ itemProps }: { itemProps: ItemInterface }) => {
  return (
    <div className={styles.Item}>
      <span className={styles.name}>{itemProps.name}</span>
      <span className={styles.price}>{itemProps.price}$</span>
    </div>
  );
};

export default Item;
