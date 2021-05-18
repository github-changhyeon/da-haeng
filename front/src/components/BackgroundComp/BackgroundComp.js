import React, { useEffect, useState } from 'react';
import styles from './BackgroundComp.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';
import BirdComp from 'src/components/BackgroundComp/BirdComp/BirdComp';

export default function BackgroundComp({ color }) {
  const history = useHistory();

  return (
    <div className={styles.background_position}>
      <div className={styles.background}>
        {/* 반응형 */}
        {/* <div className={styles.background_res}> */}
        <div
          className={styles.background_image}
          style={{
            background: `url('/images/background/bg_` + color + `_no_cloud.png') 0 0 / 100% 100%`,
          }}
        >
          <div className={styles.background_wrap}>
            <div className={styles.x1}>
              <div className={styles.cloud}></div>
            </div>
            <div className={styles.x2}>
              <div className={styles.cloud}></div>
            </div>
            <div className={styles.x3}>
              <div className={styles.cloud}></div>
            </div>
            <div className={styles.x4}>
              <div className={styles.cloud}></div>
            </div>
            <div className={styles.x5}>
              <div className={styles.cloud}></div>
            </div>
            <div className={styles.x6}>
              <div className={styles.cloud}></div>
            </div>
          </div>
          {/* <div
            className={styles.background_cloud}
            style={{
              background: `url('/images/background/cloud.png') 0 center / 90vw repeat-x`,
            }}
          > */}
          {/* TODO 힘숨찐 */}
          <BirdComp />
          {/* </div> */}
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}
