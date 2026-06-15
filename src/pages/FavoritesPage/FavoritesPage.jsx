import React from "react";
import styles from "./FavoritesPage.module.css";
import FavoritesList from "../../components/FavoritesList/FavoritesList";
import Container from "../../components/Container/Container";

export default function FavoritesPage() {
  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>Your Favorites</h1>
        <FavoritesList />
      </div>
    </Container>
  );
}
