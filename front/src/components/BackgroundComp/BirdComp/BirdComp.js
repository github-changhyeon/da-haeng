import React, { useEffect, useState } from 'react';
import styles from './BirdComp.module.css';

export default function BirdComp() {
  return (
    <div className={styles.bird}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 277 216" className={styles.bird__wing}>
        <path
          fill="#B23E2A"
          d="M101.9 123.4C92.2 95.8 142 69.6 138.7 33c23 28.1 36.3 59.9 15.1 85.5-17.6 21.3-47 18.8-52 4.8z"
        />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 277 216" className={styles.bird__body}>
        <path
          fill="#F58021"
          d="M224.7 108.6c23.1-18.1 27-51.1 27-51.1S236 80.8 229 85c0 0 15-15.7 17.9-42.6 0 0-15.8 24.5-33.8 45-24 27.5-29.7 28.6-29.7 28.6s20 9 41.3-7.5z"
        />
        <path
          fill="#F58021"
          d="M51.5 119.9c8 31.6 35 47.3 59.2 53.6 39.8 10.5 65.5-3.3 80.1-25.7 14.6-22.4 14.8-39.5 14.8-39.5-18.8-3.3-36.6-2.7-61.6-21.2-25-18.6-41-29.3-64.2-21.2a46.3 46.3 0 0 0-28.3 54z"
        />
        <path fill="#B23E2A" d="M65.2 123a6.7 6.7 0 1 0 9-9.8 6.7 6.7 0 0 0-9 9.7z" />
        <path
          fill="#511C21"
          d="M52.6 118.8a28 28 0 0 1-10.3 4.9 59.3 59.3 0 0 0 7.8-8.8l2.5 3.9z"
        />
        <path
          fill="#792A32"
          d="M50.5 108.1a22.8 22.8 0 0 0-12.4 6.3 1938.6 1938.6 0 0 1 14.5 4.4 9.5 9.5 0 0 0-2-10.7z"
        />
        <circle cx="66.1" cy="103.7" r="3.8" fill="#562404" />
        <circle cx="64.4" cy="102.6" r="1.2" fill="#E6E7E8" />
        <path
          fill="#FCC399"
          d="M154 151.8c-24.4-2-25.6-8.5-49.8-10.6a51.4 51.4 0 0 0-33.8 10.9 92.5 92.5 0 0 0 40.3 21.4c39.8 10.5 65.5-3.3 80.1-25.7 5.8-8.9 9.3-16.9 11.4-23.3-8.3 9-29.2 29-48.2 27.3z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 277 216"
        className={styles.bird__wing}
      >
        <defs>
          <path
            id="a"
            d="M115.9 118.3c-2.6-35.1 63.8-49.7 71.4-93.3 18 40 23.3 81.1-9.5 104.2-27.3 19.2-60.6 7-61.9-10.9z"
          />
        </defs>
        {/* <use fill="#E0601F" overflow="visible" xlink:href="#a" /> */}
        <use fill="#E0601F" overflow="visible" xlinkHref="#a" />
        <path
          fill="none"
          stroke="#B23E2A"
          stroke-miterlimit="10"
          d="M195.3 43.3C186 72.7 155.7 98 143 101.7M200.8 65c-13.6 23.4-38.8 41.6-50 44.2M202 85.4c-15 18.5-36.2 31.5-46 33.3"
        />
      </svg>
    </div>
  );
}
