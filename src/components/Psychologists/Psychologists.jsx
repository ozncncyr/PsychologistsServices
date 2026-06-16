import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPsychologists } from "../../services/firebase/api";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  loadMore,
} from "../../redux/features/psychologists/psychologistsSlice";
import PsychoListItem from "../PsychoListItem/PsychoListItem";
import styles from "./Psychologists.module.css";

const Psychologists = () => {
  const dispatch = useDispatch();
  const { allItems, displayCount, status, error } = useSelector(
    (state) => state.psychologists,
  );
  const token = useSelector((state) => state.auth.token);

  const loadPsychologists = async () => {
    dispatch(fetchStart());
    try {
      const data = await getPsychologists(token);
      dispatch(fetchSuccess(data));
    } catch (err) {
      dispatch(fetchFailure(err.message));
    }
  };

  useEffect(() => {
    if (status === "idle" && allItems.length === 0) {
      loadPsychologists();
    }
  }, [dispatch, status, allItems.length]);

  // If token arrives later (async), and we failed or are in succeeded but might want to retry with auth
  useEffect(() => {
    if (token && status === "failed") {
      loadPsychologists();
    }
  }, [dispatch, token]); // Re-run when token changes

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  const displayedItems = allItems.slice(0, displayCount);
  const hasMore = displayCount < allItems.length;

  return (
    <section className={styles.root}>
      {status === "loading" && allItems.length === 0 && (
        <p>Loading psychologists...</p>
      )}
      {status === "failed" && <p>Error: {error}</p>}

      <div className={styles.list}>
        {displayedItems.map((psychologist) => (
          <PsychoListItem key={psychologist.id} psychologist={psychologist} />
        ))}
      </div>

      {hasMore && (
        <button
          className={styles.loadMore}
          onClick={handleLoadMore}
          disabled={status === "loading"}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default Psychologists;
