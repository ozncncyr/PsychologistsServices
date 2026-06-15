import React from "react";
import styles from "./FavoritesItem.module.css";

export default function FavoritesItem({ id }) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.name}>Psychologist {id}</div>
        <div className={styles.meta}>Details placeholder</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.remove}>Remove</button>
      </div>
    </div>
  );
}
