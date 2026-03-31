import React from "react";
import Container from "../../components/Container/Container";
import Psychologists from "../../components/Psychologists/Psychologists";
import styles from "./PsychologistsPage.module.css";

const PsychologistsPage = () => {
  return (
    <Container>
      <div className={styles.page}>
        <Psychologists />
      </div>
    </Container>
  );
};

export default PsychologistsPage;
