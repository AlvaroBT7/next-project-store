import Item from "./Item";
import { Item as ItemInterface } from "../types";
import styles from '../style/ItemsContainer.module.css'

const Items = ({ itemsData }: { itemsData: ItemInterface[] }) => {
  return (
    <div className={styles.Items}>
      {itemsData.map((itemData) => (
        <Item key={itemData.id} itemProps={itemData} />
      ))}
    </div>
  );
};

export default Items;
