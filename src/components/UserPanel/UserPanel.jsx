import React from "react";
import styles from "./UserPanel.module.css";

const UserPanel = () => {
  return (
    <div className={styles.buttonGroup}>
      <button className={styles.loginButton}>Log In</button>
      <button className={styles.registrationButton}>Registration</button>
    </div>
  );
};

export default UserPanel;
