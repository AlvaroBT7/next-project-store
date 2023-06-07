"use client";
import { useContext } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import { Item } from "../types";
import ItemsContainer from "../components/ItemsContainer";
import SinginWindow from "../components/SinginWindow";
import LogginWindow from "../components/LogginWindow";
import itemsData from "../data/items.json";

function Home() {
  const { showingSigninWindow, showingLoginWindow } = useContext(
    UsersDataContext
  ) as {
    showingSigninWindow: boolean;
    showingLoginWindow: boolean;
  };
  return (
    <div>
      {showingLoginWindow ? <LogginWindow /> : null}
      {showingSigninWindow ? <SinginWindow /> : null}
      <ItemsContainer itemsData={itemsData as Item[]} />
    </div>
  );
}

export default Home;
