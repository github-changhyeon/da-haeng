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
          <div
            className={styles.background_cloud}
            style={{
              background: `url('/images/background/cloud.png') 0 center / 90vw repeat-x`,
            }}
          >
            <BirdComp />
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}
