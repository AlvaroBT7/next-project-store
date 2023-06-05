"use client";
import { useContext } from "react";
import { UsersDataContext } from "../contexts/UsersData";
import AccountLogo from "./AccountLogo";
import styles from "../style/Nav.module.css";

const Nav = () => {
  const { currentUserAccountId } = useContext(UsersDataContext) as { currentUserAccountId: number | null };
  return (
    <ul className={styles.Nav}>
      <li className={styles.li}>PAN store</li>
      <li>
        <AccountLogo userId={currentUserAccountId} />
      </li>
    </ul>
  );
};

export default Nav;
