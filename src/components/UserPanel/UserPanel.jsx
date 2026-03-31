import React, { useState } from "react";
import styles from "./UserPanel.module.css";
import LogInForm from "../LogInForm/LogInForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const UserPanel = () => {
  const [open, setOpen] = useState(null); // 'login' | 'register' | null

  return (
    <div className={styles.buttonGroup}>
      <button className={styles.loginButton} onClick={() => setOpen("login")}>
        Log In
      </button>
      <button
        className={styles.registrationButton}
        onClick={() => setOpen("register")}
      >
        Registration
      </button>

      {open === "login" && <LogInForm onClose={() => setOpen(null)} />}

      {open === "register" && <RegisterForm onClose={() => setOpen(null)} />}
    </div>
  );
};

export default UserPanel;
