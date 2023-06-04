import { useState } from "react";
import ItemsContainer from "../components/ItemsContainer";
import { Item } from "../types";
import itemsData from "../data/items.json";

function Home() {
  return (
    <div>
      <ItemsContainer itemsData={itemsData as Item[]} />
    </div>
  );
}

export default Home;
