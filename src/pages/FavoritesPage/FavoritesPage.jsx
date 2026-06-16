import React from "react";
import { useSelector } from "react-redux";
import styles from "./FavoritesPage.module.css";
import PsychoListItem from "../../components/PsychoListItem/PsychoListItem";
import Container from "../../components/Container/Container";

export default function FavoritesPage() {
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const psychologists = useSelector((state) => state.psychologists.allItems);

  const favoritePsychologists = psychologists.filter((psycho) =>
    favoriteIds.includes(psycho.id),
  );

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>Your Favorites</h1>
        <div className={styles.favoritesGrid}>
          {favoritePsychologists.length > 0 ? (
            favoritePsychologists.map((psychologist) => (
              <PsychoListItem
                key={psychologist.id}
                psychologist={psychologist}
              />
            ))
          ) : (
            <p className={styles.empty}>You have no favorites yet.</p>
          )}
        </div>
      </div>
    </Container>
  );
}
