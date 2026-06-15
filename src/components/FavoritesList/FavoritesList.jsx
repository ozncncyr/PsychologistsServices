import React from "react";
import styles from "./FavoritesList.module.css";
import FavoritesItem from "../FavoritesItem/FavoritesItem";
import { useSelector } from "react-redux";

export default function FavoritesList() {
  const ids = useSelector((state) => state.favorites.ids || []);
  // For now we only have ids; ideally you'd select full objects from psychologists list
  if (!ids.length)
    return <div className={styles.empty}>You have no favorites yet.</div>;

  return (
    <div className={styles.list}>
      {ids.map((id) => (
        <FavoritesItem key={id} id={id} />
      ))}
    </div>
  );
}
