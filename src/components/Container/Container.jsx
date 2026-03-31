import React from "react";
import styles from "./Container.module.css";

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
