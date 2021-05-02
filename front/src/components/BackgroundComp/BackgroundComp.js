import React, { useEffect, useState } from 'react';
import styles from './BackgroundComp.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';

export default function BackgroundComp() {
  const history = useHistory();

  return (
    <div className={styles.background}>
      {/* 반응형 */}
      {/* <div className={styles.background_res}> */}
      <div>
        <div
          className={styles.background_image}
          style={{
            background: `url('/images/background/background_no_cloud.png') 0 0 / 100% 100%`,
          }}
        ></div>
        <div
          className={styles.background_cloud}
          style={{
            background: `url('/images/background/cloud.png') 0 center / 90% repeat-x`,
          }}
        ></div>
      </div>
      {/* </div> */}
    </div>
  );
}
