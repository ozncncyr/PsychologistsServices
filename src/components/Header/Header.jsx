import React from "react";
import Navigation from "../Navigation/Navigation";
import UserPanel from "../UserPanel/UserPanel";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        <Navigation />
      </div>
      <UserPanel />
    </header>
  );
};

export default Header;
