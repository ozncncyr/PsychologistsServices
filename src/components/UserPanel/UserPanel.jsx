import React, { useState } from "react";
import styles from "./UserPanel.module.css";
import LogInForm from "../LogInForm/LogInForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useSelector, useDispatch } from "react-redux";
import { performLogout } from "../../redux/features/auth/authThunks";

const UserPanel = () => {
  const [open, setOpen] = useState(null); // 'login' | 'register' | null
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (user) {
    const displayName = user.displayName || user.email?.split("@")[0] || "User";
    return (
      <div className={styles.loggedIn}>
        <div className={styles.userInfo}>
          <div className={styles.avatar} aria-hidden>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                fill="#fff"
              />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="#fff" />
            </svg>
          </div>
          <div className={styles.name}>{displayName}</div>
        </div>

        <button
          className={styles.loginButton}
          onClick={() => dispatch(performLogout())}
        >
          Log out
        </button>
      </div>
    );
  }

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
