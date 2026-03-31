import React from "react";
import Container from "../Container/Container";
import styles from "./Home.module.css";
import heroImg from "../../assets/hero_img.png";

const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          The road to the <span className={styles.accent}>depths</span> of the
          human soul
        </h1>
        <p className={styles.lead}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button className={styles.heroBtn}>
          Get started <span style={{ fontSize: "22px" }}>🡥</span>
        </button>
      </div>

      <div className={styles.right}>
        <div className={styles.imagePlaceholder}>
          <img className={styles.heroImg} src={heroImg} alt="Hero" />
        </div>
        <div className={styles.badge}>
          <div className={styles.badgeTick}>✓</div>
          <div className={styles.badgeTexts}>
            <p className={styles.badgeText1}>Experienced psychologists</p>
            <p className={styles.badgeText2}>15,000</p>
          </div>
        </div>
        <div className={styles.decorationSmall}>?</div>
        <div className={styles.decorationSmall2}>
          <svg
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6043 11.9741L11.1765 13.5708L2.16847e-05 10.576L0.427841 8.97939C0.427841 8.97939 1.28348 5.7861 6.87173 7.28347C12.46 8.78083 11.6043 11.9741 11.6043 11.9741ZM10.8424 3.64138C10.9904 3.08875 10.9713 2.50463 10.7874 1.96287C10.6035 1.42111 10.2631 0.946053 9.8092 0.597768C9.3553 0.249483 8.80832 0.0436141 8.23743 0.00619567C7.66653 -0.0312229 7.09736 0.101489 6.60189 0.38755C6.10642 0.67361 5.7069 1.10017 5.45386 1.61329C5.20082 2.12641 5.10562 2.70304 5.18029 3.27027C5.25497 3.83749 5.49617 4.36984 5.8734 4.79998C6.25062 5.23012 6.74693 5.53875 7.29955 5.68682C8.0406 5.88539 8.83018 5.78144 9.49458 5.39784C10.159 5.01425 10.6438 4.38243 10.8424 3.64138ZM12.4121 8.768C12.8011 9.2793 13.0733 9.86964 13.2096 10.4975C13.3459 11.1253 13.343 11.7754 13.201 12.4019L12.7732 13.9986L15.9665 14.8542L16.3943 13.2576C16.3943 13.2576 17.1708 10.3597 12.4121 8.768ZM13.5869 1.38203C13.0382 1.23173 12.4568 1.25202 11.9199 1.44019C12.2233 2.24769 12.2663 3.12989 12.0431 3.96311C11.8198 4.79633 11.3414 5.5388 10.6749 6.08642C11.0458 6.51782 11.5392 6.8261 12.0895 6.97028C12.8305 7.16884 13.6201 7.06489 14.2845 6.6813C14.9489 6.2977 15.4337 5.66589 15.6323 4.92484C15.8309 4.18379 15.7269 3.39421 15.3433 2.72981C14.9597 2.0654 14.3279 1.58059 13.5869 1.38203Z"
              fill="#FBFBFB"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Home;
