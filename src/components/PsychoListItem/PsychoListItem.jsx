import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/favorites/favoritesThunks";
import { openModal, showToast } from "../../redux/features/ui/uiSlice";
import styles from "./PsychoListItem.module.css";

const PsychoListItem = ({ psychologist }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const favoriteIds = useSelector((state) => state.favorites.ids);

  // Destructuring for convenience, using provided data or defaults for visual consistency with design
  const {
    id,
    name,
    avatar_url,
    experience,
    license,
    specialization,
    initial_consultation,
    rating,
    price_per_hour,
    about,
    reviews = [],
  } = psychologist || {};

  const isFavorite = id && favoriteIds.includes(id);

  const handleFavoriteClick = () => {
    if (!user) {
      dispatch(
        showToast({
          message: "Please log in to add favorites",
          type: "info",
        }),
      );
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(user.uid, id));
    } else {
      dispatch(addFavorite(user.uid, id));
    }
  };

  const handleBookAppointment = () => {
    if (!user) {
      dispatch(
        showToast({
          message: "Please log in to book an appointment",
          type: "info",
        }),
      );
      return;
    }
    dispatch(openModal({ type: "appointment", data: psychologist }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <img src={avatar_url} alt={name} className={styles.avatarImage} />
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot}></div>
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.subTitle}>Psychologist</span>
            <h2 className={styles.name}>{name}</h2>
          </div>

          <div className={styles.statsWrapper}>
            <div className={styles.statItem}>
              <svg
                className={styles.starIcon}
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
              </svg>
              <span>Rating: {rating}</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <span>
                Price / 1 hour:{" "}
                <span className={styles.priceValue}>{price_per_hour}$</span>
              </span>
            </div>
            <button
              className={`${styles.favoriteBtn} ${
                isFavorite ? styles.isFavorite : ""
              }`}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                className={styles.heartIcon}
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke={isFavorite ? "#fc832c" : "currentColor"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.tagsWrapper}>
          <div className={styles.tag}>
            Experience: <span className={styles.tagValue}>{experience}</span>
          </div>
          <div className={styles.tag}>
            License: <span className={styles.tagValue}>{license}</span>
          </div>
          <div className={styles.tag}>
            Specialization:{" "}
            <span className={styles.tagValue}>{specialization}</span>
          </div>
          <div className={styles.tag}>
            Initial_consultation:{" "}
            <span className={styles.tagValue}>{initial_consultation}</span>
          </div>
        </div>

        <p className={styles.description}>{about}</p>

        {!isExpanded && (
          <button
            className={styles.readMoreBtn}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={styles.expandedContent}>
            <div className={styles.reviewsWrapper}>
              {reviews.map((review, index) => (
                <div key={index} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerAvatar}>
                      {review.reviewer.charAt(0)}
                    </div>
                    <div>
                      <h4 className={styles.reviewerName}>{review.reviewer}</h4>
                      <div className={styles.reviewRating}>
                        <svg
                          className={styles.starIconSmall}
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
                        </svg>
                        <span>{review.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
            <button
              className={styles.appointmentBtn}
              onClick={handleBookAppointment}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychoListItem;
