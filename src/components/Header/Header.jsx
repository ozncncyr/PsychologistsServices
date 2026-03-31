import React from "react";
import Navigation from "../Navigation/Navigation";
import UserPanel from "../UserPanel/UserPanel";
import styles from "./Header.module.css";
import Container from "../Container/Container";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.leftContent}>
            <Navigation />
          </div>
          <UserPanel />
        </div>
      </Container>
    </header>
  );
};

export default Header;
