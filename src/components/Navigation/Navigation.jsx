import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Logo" className={css.logo} />
      </NavLink>
      <div className={css.links}>
        <NavLink to="/">
          {({ isActive }) => (
            <span className={isActive ? css.activeLink : css.link}>
              Home
              {isActive && <span className={css.activeDot}></span>}
            </span>
          )}
        </NavLink>
        <NavLink to="/psychologists">
          {({ isActive }) => (
            <span className={isActive ? css.activeLink : css.link}>
              Psychologists
              {isActive && <span className={css.activeDot}></span>}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
