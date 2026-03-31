import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </NavLink>
      <div className={styles.links}>
        <NavLink to="/">
          {({ isActive }) => (
            <span className={isActive ? styles.activeLink : styles.link}>
              Home
              {isActive && <span className={styles.activeDot}></span>}
            </span>
          )}
        </NavLink>
        <NavLink to="/psychologists">
          {({ isActive }) => (
            <span className={isActive ? styles.activeLink : styles.link}>
              Psychologists
              {isActive && <span className={styles.activeDot}></span>}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
