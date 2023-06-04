"use client";
import { CurrentUserAccountIdContext } from "../contexts/CurrentUserAccountId";
import { useContext } from "react";
import AccountLogo from "./AccountLogo";
import styles from "../style/Nav.module.css";

const Nav = () => {
  const currentUserAccountId = useContext(CurrentUserAccountIdContext);
  const handleClick = () => {
    console.log(currentUserAccountId);
  };
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
