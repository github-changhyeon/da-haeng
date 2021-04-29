import React, { useEffect, useState } from 'react';
import styles from './ProgressComp.module.css';

export default function ProgressComp({ percent }) {
  return (
    // <div className={styles.flex_wrapper}>
    // <div className={styles.single_chart}>
    <svg viewBox="0 0 36 36" className={styles.circular_chart}>
      <path
        className={styles.circle_bg}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className={styles.circle}
        // stroke-dasharray="60, 100"
        stroke-dasharray={percent + ', 100'}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" className={styles.percentage}>
        {percent}%
      </text>
    </svg>
    // </div>
    // </div>
  );
}
