import React, { useEffect, useState } from 'react';
import styles from './BackComp.module.css';
import { useHistory, generatePath } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function BackComp() {
  const history = useHistory();

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div
          className={styles.header_left_button}
          onClick={() => {
            history.go(-1);
          }}
        >
          <div className={styles.header_left_button_text}>
            <ArrowBackIcon className={styles.header_left_button_icon} />
            뒤로가기
          </div>
        </div>
      </div>
    </div>
  );
}
