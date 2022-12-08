import React from 'react';
import styles from './Intro.module.css';
function IntroCard({ image, description }) {
  return (
    <div>
      <div className={styles.boxCard}>
        <img src={image} alt="" className={styles.image} />
        <div className={styles.infor}>
          <h2 className={styles.title}>Đặt khám nhanh chóng</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default IntroCard;
