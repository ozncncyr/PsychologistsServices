import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";

const Navigation = () => {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <NavLink to="/">
        <img src={logo} alt="Logo" style={{ height: 40 }} />
      </NavLink>
      <NavLink
        to="/"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        Home
      </NavLink>
      <NavLink
        to="/psychologists"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        Psychologists
      </NavLink>
    </nav>
  );
};

export default Navigation;
